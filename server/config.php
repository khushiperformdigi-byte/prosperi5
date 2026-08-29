<?php
// Prosperi5 Hostinger PHP Backend Configuration

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_USER', getenv('DB_USER') ?: 'u808577555_porsperi555');
define('DB_PASS', getenv('DB_PASSWORD') ?: 'Porsperi555');
define('DB_NAME', getenv('DB_NAME') ?: 'u808577555_porsperi555');

define('JWT_SECRET', getenv('JWT_SECRET') ?: 'Prosperi5_Secret_JWT_Token_Key_2026_Secure_Hostinger');
define('JWT_EXPIRES_IN', 86400 * 7); // 7 Days

define('APP_URL', 'https://deeppink-worm-696612.hostingersite.com');
