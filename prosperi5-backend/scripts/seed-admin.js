import env from '../config/env.js';
import { pingDatabase } from '../config/db.js';
import { ensureAdmin } from '../services/auth.service.js';

async function main() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in env before seeding.');
    process.exit(1);
  }

  await pingDatabase();

  const result = await ensureAdmin({
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    name: env.ADMIN_NAME || 'Prosperi5 Admin',
  });

  if (result.created) {
    console.log(`Admin created: ${env.ADMIN_EMAIL}`);
  } else {
    console.log(`Admin already exists: ${env.ADMIN_EMAIL}`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
