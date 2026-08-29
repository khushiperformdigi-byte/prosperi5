<?php
// Enquiries Controller

require_once __DIR__ . '/../db.php';

class EnquiriesController {
    private static function ensureTableExists() {
        try {
            DB::execute("
                CREATE TABLE IF NOT EXISTS enquiries (
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    form_name VARCHAR(255) NOT NULL DEFAULT 'Website Form',
                    form_path VARCHAR(255) NOT NULL DEFAULT '/',
                    name VARCHAR(191) DEFAULT NULL,
                    email VARCHAR(191) DEFAULT NULL,
                    phone VARCHAR(100) DEFAULT NULL,
                    city VARCHAR(100) DEFAULT NULL,
                    service VARCHAR(255) DEFAULT NULL,
                    message LONGTEXT DEFAULT NULL,
                    extra_data LONGTEXT DEFAULT NULL,
                    status VARCHAR(50) NOT NULL DEFAULT 'new',
                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    KEY idx_enquiries_path (form_path),
                    KEY idx_enquiries_status (status)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            ");
        } catch (Exception $e) {
            // Ignore DB table error
        }
    }

    public static function formatEnquiry(array $row): array {
        $extra = [];
        if (!empty($row['extra_data'])) {
            $decoded = json_decode($row['extra_data'], true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $extra = $decoded;
            }
        }

        return [
            'id' => (int)$row['id'],
            'formName' => $row['form_name'] ?? 'Website Form',
            'formPath' => $row['form_path'] ?? '/',
            'name' => $row['name'] ?? '',
            'email' => $row['email'] ?? '',
            'phone' => $row['phone'] ?? '',
            'city' => $row['city'] ?? '',
            'service' => $row['service'] ?? '',
            'message' => $row['message'] ?? '',
            'extra' => $extra,
            'status' => $row['status'] ?? 'new',
            'createdAt' => $row['created_at'] ?? null
        ];
    }

    public static function submit(array $body): array {
        self::ensureTableExists();

        $formName = trim($body['formName'] ?? $body['form_name'] ?? 'Website Form');
        $formPath = trim($body['formPath'] ?? $body['form_path'] ?? '/');
        $name = trim($body['name'] ?? $body['fullName'] ?? $body['full_name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $city = trim($body['city'] ?? '');
        $service = trim($body['service'] ?? '');
        $message = trim($body['message'] ?? '');

        $extra = $body['extra'] ?? [];
        if (is_string($extra)) {
            $extra = json_decode($extra, true) ?: [];
        }
        $extraJson = !empty($extra) ? json_encode($extra) : null;

        try {
            DB::execute(
                'INSERT INTO enquiries (form_name, form_path, name, email, phone, city, service, message, extra_data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [$formName, $formPath, $name, $email, $phone, $city, $service, $message, $extraJson]
            );
            $newId = (int)DB::lastInsertId();

            return [
                'success' => true,
                'data' => [
                    'id' => $newId,
                    'message' => 'Enquiry submitted and recorded successfully'
                ]
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ['success' => false, 'message' => 'Failed to save enquiry: ' . $e->getMessage()];
        }
    }

    public static function listAdmin(array $queryParams): array {
        self::ensureTableExists();

        $where = ['1=1'];
        $params = [];

        if (!empty($queryParams['path']) && $queryParams['path'] !== 'all') {
            $where[] = 'form_path LIKE ?';
            $params[] = '%' . $queryParams['path'] . '%';
        }
        if (!empty($queryParams['search'])) {
            $where[] = '(name LIKE ? OR email LIKE ? OR phone LIKE ? OR form_name LIKE ? OR message LIKE ?)';
            $searchStr = '%' . $queryParams['search'] . '%';
            $params[] = $searchStr;
            $params[] = $searchStr;
            $params[] = $searchStr;
            $params[] = $searchStr;
            $params[] = $searchStr;
        }

        $sql = 'SELECT * FROM enquiries WHERE ' . implode(' AND ', $where) . ' ORDER BY id DESC';
        $rows = DB::query($sql, $params);
        $enquiries = array_map([self::class, 'formatEnquiry'], $rows);

        return [
            'success' => true,
            'data' => [
                'enquiries' => $enquiries,
                'count' => count($enquiries)
            ]
        ];
    }

    public static function deleteAdmin(int $id): array {
        self::ensureTableExists();
        DB::execute('DELETE FROM enquiries WHERE id = ?', [$id]);
        return ['success' => true, 'message' => 'Enquiry deleted successfully'];
    }
}
