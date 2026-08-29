<?php
// Jobs Controller

require_once __DIR__ . '/../db.php';

class JobsController {
    public static function formatJob(array $row): array {
        return [
            'id' => (int)$row['id'],
            'title' => $row['title'],
            'slug' => $row['slug'],
            'department' => $row['department'],
            'location' => $row['location'],
            'type' => $row['type'],
            'experience' => $row['experience'],
            'description' => $row['description'],
            'responsibilities' => is_string($row['responsibilities']) ? json_decode($row['responsibilities'], true) ?: [] : ($row['responsibilities'] ?: []),
            'requirements' => is_string($row['requirements']) ? json_decode($row['requirements'], true) ?: [] : ($row['requirements'] ?: []),
            'status' => $row['status'],
            'createdAt' => $row['created_at'],
            'updatedAt' => $row['updated_at']
        ];
    }

    public static function listPublic(array $queryParams): array {
        $where = ["status = 'published'"];
        $params = [];

        if (!empty($queryParams['department'])) {
            $where[] = 'department = ?';
            $params[] = $queryParams['department'];
        }
        if (!empty($queryParams['location'])) {
            $where[] = 'location = ?';
            $params[] = $queryParams['location'];
        }
        if (!empty($queryParams['search'])) {
            $where[] = '(title LIKE ? OR description LIKE ? OR department LIKE ?)';
            $searchStr = '%' . $queryParams['search'] . '%';
            $params[] = $searchStr;
            $params[] = $searchStr;
            $params[] = $searchStr;
        }

        $sql = 'SELECT * FROM jobs WHERE ' . implode(' AND ', $where) . ' ORDER BY id DESC';
        $rows = DB::query($sql, $params);
        $jobs = array_map([self::class, 'formatJob'], $rows);

        return [
            'success' => true,
            'data' => [
                'jobs' => $jobs,
                'count' => count($jobs)
            ]
        ];
    }

    public static function getPublic(string $idOrSlug): array {
        $job = is_numeric($idOrSlug)
            ? DB::queryOne("SELECT * FROM jobs WHERE id = ? AND status = 'published'", [(int)$idOrSlug])
            : DB::queryOne("SELECT * FROM jobs WHERE slug = ? AND status = 'published'", [$idOrSlug]);

        if (!$job) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Job opening not found'];
        }

        return [
            'success' => true,
            'data' => [
                'job' => self::formatJob($job)
            ]
        ];
    }

    public static function apply(array $body): array {
        $jobId = (int)($body['jobId'] ?? $body['job_id'] ?? 0);
        $fullName = trim($body['fullName'] ?? $body['full_name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $message = trim($body['message'] ?? '');

        if (!$jobId || !$fullName || !$email || !$phone) {
            http_response_code(400);
            return ['success' => false, 'message' => 'jobId, fullName, email, and phone are required'];
        }

        DB::execute(
            'INSERT INTO job_applications (job_id, full_name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [$jobId, $fullName, $email, $phone, $message]
        );

        return [
            'success' => true,
            'data' => [
                'applicationId' => (int)DB::lastInsertId(),
                'message' => 'Application submitted successfully'
            ]
        ];
    }

    public static function submitEnquiry(array $body): array {
        return [
            'success' => true,
            'message' => 'Enquiry received successfully'
        ];
    }

    public static function listAdmin(array $queryParams): array {
        $where = ['1=1'];
        $params = [];

        if (!empty($queryParams['status']) && $queryParams['status'] !== 'all') {
            $where[] = 'status = ?';
            $params[] = $queryParams['status'];
        }
        if (!empty($queryParams['search'])) {
            $where[] = '(title LIKE ? OR department LIKE ?)';
            $searchStr = '%' . $queryParams['search'] . '%';
            $params[] = $searchStr;
            $params[] = $searchStr;
        }

        $sql = 'SELECT * FROM jobs WHERE ' . implode(' AND ', $where) . ' ORDER BY id DESC';
        $rows = DB::query($sql, $params);
        $jobs = array_map([self::class, 'formatJob'], $rows);

        return [
            'success' => true,
            'data' => [
                'jobs' => $jobs,
                'count' => count($jobs)
            ]
        ];
    }

    public static function getAdmin(int $id): array {
        $job = DB::queryOne('SELECT * FROM jobs WHERE id = ?', [$id]);
        if (!$job) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Job not found'];
        }
        return ['success' => true, 'data' => ['job' => self::formatJob($job)]];
    }

    public static function create(array $body): array {
        $title = trim($body['title'] ?? '');
        $department = trim($body['department'] ?? '');
        $location = trim($body['location'] ?? '');
        $type = trim($body['type'] ?? 'Full-time');
        $experience = trim($body['experience'] ?? '');
        $description = trim($body['description'] ?? '');
        $status = trim($body['status'] ?? 'published');

        if (!$title || !$department || !$location) {
            http_response_code(400);
            return ['success' => false, 'message' => 'Title, department, and location are required'];
        }

        $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($title)) . '-' . time();
        $respJson = json_encode($body['responsibilities'] ?? []);
        $reqJson = json_encode($body['requirements'] ?? []);

        DB::execute(
            'INSERT INTO jobs (title, slug, department, location, type, experience, description, responsibilities, requirements, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [$title, $slug, $department, $location, $type, $experience, $description, $respJson, $reqJson, $status]
        );

        $newId = (int)DB::lastInsertId();
        return self::getAdmin($newId);
    }

    public static function update(int $id, array $body): array {
        $job = DB::queryOne('SELECT * FROM jobs WHERE id = ?', [$id]);
        if (!$job) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Job not found'];
        }

        $title = $body['title'] ?? $job['title'];
        $department = $body['department'] ?? $job['department'];
        $location = $body['location'] ?? $job['location'];
        $type = $body['type'] ?? $job['type'];
        $experience = $body['experience'] ?? $job['experience'];
        $description = $body['description'] ?? $job['description'];
        $status = $body['status'] ?? $job['status'];

        $respJson = isset($body['responsibilities']) ? json_encode($body['responsibilities']) : $job['responsibilities'];
        $reqJson = isset($body['requirements']) ? json_encode($body['requirements']) : $job['requirements'];

        DB::execute(
            'UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, experience = ?, description = ?, responsibilities = ?, requirements = ?, status = ?, updated_at = NOW() WHERE id = ?',
            [$title, $department, $location, $type, $experience, $description, $respJson, $reqJson, $status, $id]
        );

        return self::getAdmin($id);
    }

    public static function delete(int $id): array {
        DB::execute('DELETE FROM jobs WHERE id = ?', [$id]);
        return ['success' => true, 'message' => 'Job deleted successfully'];
    }
}
