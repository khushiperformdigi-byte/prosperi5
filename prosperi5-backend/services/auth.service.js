import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/env.js';
import { query } from '../config/db.js';
import { AppError } from '../utils/errors.js';

export async function loginAdmin({ email, password }) {
  const rows = await query(
    `SELECT id, email, name, password_hash, is_active
     FROM admins
     WHERE email = :email
     LIMIT 1`,
    { email: email.toLowerCase() }
  );

  const admin = rows[0];
  if (!admin || !admin.is_active) {
    throw new AppError('Invalid email or password', 401);
  }

  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) {
    throw new AppError('Invalid email or password', 401);
  }

  await query(
    `UPDATE admins SET last_login_at = UTC_TIMESTAMP() WHERE id = :id`,
    { id: admin.id }
  );

  const token = jwt.sign(
    {
      email: admin.email,
      name: admin.name,
    },
    env.JWT_SECRET,
    {
      subject: admin.id,
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  };
}

export async function ensureAdmin({ email, password, name }) {
  const existing = await query(
    `SELECT id FROM admins WHERE email = :email LIMIT 1`,
    { email: email.toLowerCase() }
  );

  if (existing.length) {
    return { created: false, id: existing[0].id };
  }

  const id = uuidv4();
  const passwordHash = await bcrypt.hash(password, 12);

  await query(
    `INSERT INTO admins (id, email, password_hash, name, is_active)
     VALUES (:id, :email, :passwordHash, :name, 1)`,
    {
      id,
      email: email.toLowerCase(),
      passwordHash,
      name,
    }
  );

  return { created: true, id };
}
