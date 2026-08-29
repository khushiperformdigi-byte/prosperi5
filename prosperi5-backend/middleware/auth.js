import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { query } from '../config/db.js';
import { AppError } from '../utils/errors.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.admin = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
    return next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
}

export async function requireActiveAdmin(req, res, next) {
  try {
    const rows = await query(
      `SELECT id, email, name, is_active
       FROM admins
       WHERE id = :id
       LIMIT 1`,
      { id: req.admin.id }
    );

    const admin = rows[0];
    if (!admin || !admin.is_active) {
      return next(new AppError('Admin account is inactive or missing', 403));
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };
    return next();
  } catch (error) {
    return next(error);
  }
}
