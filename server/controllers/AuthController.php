<?php
// Auth Controller

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../jwt.php';

class AuthController {
    public static function login(array $body) {
        $email = trim($body['email'] ?? '');
        $password = trim($body['password'] ?? '');

        if (!$email || !$password) {
            http_response_code(400);
            return ['success' => false, 'message' => 'Email and password are required'];
        }

        $admin = DB::queryOne('SELECT * FROM admins WHERE email = ? AND is_active = 1', [$email]);
        if (!$admin) {
            http_response_code(401);
            return ['success' => false, 'message' => 'Invalid email or password'];
        }

        $passwordValid = password_verify($password, $admin['password_hash']) || $admin['password_hash'] === md5($password);
        if (!$passwordValid) {
            http_response_code(401);
            return ['success' => false, 'message' => 'Invalid email or password'];
        }

        // Update last login
        DB::execute('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [$admin['id']]);

        $payload = [
            'sub' => $admin['id'],
            'email' => $admin['email'],
            'name' => $admin['name'],
            'iat' => time(),
            'exp' => time() + JWT_EXPIRES_IN
        ];

        $token = JWT::encode($payload, JWT_SECRET);

        return [
            'success' => true,
            'data' => [
                'token' => $token,
                'admin' => [
                    'id' => (int)$admin['id'],
                    'email' => $admin['email'],
                    'name' => $admin['name']
                ]
            ]
        ];
    }

    public static function me(array $adminUser) {
        return [
            'success' => true,
            'data' => [
                'admin' => [
                    'id' => (int)$adminUser['id'],
                    'email' => $adminUser['email'],
                    'name' => $adminUser['name']
                ]
            ]
        ];
    }

    public static function authenticate(): ?array {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        if (!$authHeader || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Authorization token required']);
            exit;
        }

        $token = $matches[1];
        $payload = JWT::decode($token, JWT_SECRET);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid or expired token']);
            exit;
        }

        $admin = DB::queryOne('SELECT id, email, name, is_active FROM admins WHERE id = ? AND is_active = 1', [$payload['sub']]);
        if (!$admin) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Admin account inactive or not found']);
            exit;
        }

        return $admin;
    }
}
