<?php
// Prosperi5 REST API Master Router & Entry Point (PHP 8)

// 1. Universal CORS Headers (Supports all origins, preflights & credentials)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 2. Load Controllers & Helpers
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/jwt.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/JobsController.php';
require_once __DIR__ . '/controllers/BlogController.php';
require_once __DIR__ . '/controllers/MediaController.php';
require_once __DIR__ . '/controllers/EnquiriesController.php';

// 3. Parse Request Method & Path
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Strip query string and leading/trailing slashes
$path = '/' . trim($uri, '/');

// Handle subfolder deployment if necessary (/api/...)
if (str_starts_with($path, '/api')) {
    $path = substr($path, 4);
}
if (!$path) $path = '/';

// 4. Parse Request Body
$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, true) ?: $_POST;

// 5. Route Table
try {
    // System Health
    if ($method === 'GET' && ($path === '/health' || $path === '/')) {
        header('Content-Type: application/json');
        $dbStatus = 'connected';
        try {
            DB::getConnection();
        } catch (Exception $e) {
            $dbStatus = 'disconnected: ' . $e->getMessage();
        }
        echo json_encode([
            'success' => true,
            'data' => [
                'status' => 'ok',
                'service' => 'prosperi5-php-api',
                'database' => $dbStatus,
                'time' => date('c')
            ]
        ]);
        exit;
    }

    // Media Serving (Binary output)
    if ($method === 'GET' && preg_match('#^/media/(\d+)$#', $path, $m)) {
        MediaController::serve((int)$m[1]);
        exit;
    }

    // JSON API Endpoints
    header('Content-Type: application/json');

    // Public Careers
    if ($method === 'GET' && $path === '/jobs') {
        echo json_encode(JobsController::listPublic($_GET));
        exit;
    }
    if ($method === 'GET' && preg_match('#^/jobs/([^/]+)$#', $path, $m)) {
        echo json_encode(JobsController::getPublic(urldecode($m[1])));
        exit;
    }
    if ($method === 'POST' && $path === '/applications') {
        echo json_encode(JobsController::apply($body));
        exit;
    }
    if ($method === 'POST' && $path === '/enquiries') {
        echo json_encode(EnquiriesController::submit($body));
        exit;
    }

    // Public Blog
    if ($method === 'GET' && $path === '/posts') {
        echo json_encode(BlogController::listPublic($_GET));
        exit;
    }
    if ($method === 'GET' && preg_match('#^/posts/([^/]+)$#', $path, $m)) {
        echo json_encode(BlogController::getPublic(urldecode($m[1])));
        exit;
    }

    // Auth
    if ($method === 'POST' && $path === '/auth/login') {
        echo json_encode(AuthController::login($body));
        exit;
    }
    if ($method === 'GET' && $path === '/auth/me') {
        $admin = AuthController::authenticate();
        echo json_encode(AuthController::me($admin));
        exit;
    }

    // Admin Jobs (Requires Auth)
    if ($method === 'GET' && $path === '/admin/jobs') {
        AuthController::authenticate();
        echo json_encode(JobsController::listAdmin($_GET));
        exit;
    }
    if ($method === 'GET' && preg_match('#^/admin/jobs/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(JobsController::getAdmin((int)$m[1]));
        exit;
    }
    if ($method === 'POST' && $path === '/admin/jobs') {
        AuthController::authenticate();
        echo json_encode(JobsController::create($body));
        exit;
    }
    if (($method === 'PATCH' || $method === 'PUT') && preg_match('#^/admin/jobs/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(JobsController::update((int)$m[1], $body));
        exit;
    }
    if ($method === 'DELETE' && preg_match('#^/admin/jobs/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(JobsController::delete((int)$m[1]));
        exit;
    }

    // Admin Blog (Requires Auth)
    if ($method === 'GET' && $path === '/admin/posts') {
        AuthController::authenticate();
        echo json_encode(BlogController::listAdmin($_GET));
        exit;
    }
    if ($method === 'GET' && preg_match('#^/admin/posts/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(BlogController::getAdmin((int)$m[1]));
        exit;
    }
    if ($method === 'POST' && $path === '/admin/posts') {
        AuthController::authenticate();
        echo json_encode(BlogController::create($body));
        exit;
    }
    if (($method === 'PATCH' || $method === 'PUT') && preg_match('#^/admin/posts/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(BlogController::update((int)$m[1], $body));
        exit;
    }
    if ($method === 'DELETE' && preg_match('#^/admin/posts/(\d+)$#', $path, $m)) {
        AuthController::authenticate();
        echo json_encode(BlogController::delete((int)$m[1]));
        exit;
    }

    // Admin Media Uploads (Requires Auth)
    if ($method === 'POST' && $path === '/admin/media') {
        AuthController::authenticate();
        echo json_encode(MediaController::upload());
        exit;
    }
    if ($method === 'POST' && $path === '/admin/media/from-url') {
        AuthController::authenticate();
        echo json_encode(MediaController::uploadFromUrl($body));
        exit;
    }

    // Admin Enquiries / Leads
    if ($method === 'GET' && $path === '/admin/enquiries') {
        echo json_encode(EnquiriesController::listAdmin($_GET));
        exit;
    }
    if ($method === 'DELETE' && preg_match('#^/admin/enquiries/(\d+)$#', $path, $m)) {
        echo json_encode(EnquiriesController::deleteAdmin((int)$m[1]));
        exit;
    }

    // 404 Route Not Found Fallback
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'API endpoint not found', 'path' => $path]);

} catch (Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error: ' . $e->getMessage()
    ]);
}
