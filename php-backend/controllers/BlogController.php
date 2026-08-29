<?php
// Blog Controller

require_once __DIR__ . '/../db.php';

class BlogController {
    public static function formatPost(array $row): array {
        $img = $row['featured_image_url'] ?? $row['featuredImageUrl'] ?? $row['image_url'] ?? $row['imageUrl'] ?? '';
        return [
            'id' => (int)$row['id'],
            'title' => $row['title'] ?? '',
            'slug' => $row['slug'] ?? '',
            'category' => $row['category'] ?? 'General',
            'excerpt' => $row['excerpt'] ?? '',
            'content' => $row['content'] ?? '',
            'readTime' => $row['read_time'] ?? $row['readTime'] ?? '5 min read',
            'featuredImageUrl' => $img,
            'status' => $row['status'] ?? 'published',
            'createdAt' => $row['created_at'] ?? null,
            'updatedAt' => $row['updated_at'] ?? null
        ];
    }

    public static function listPublic(array $queryParams): array {
        $where = ["status = 'published'"];
        $params = [];

        if (!empty($queryParams['category'])) {
            $where[] = 'category = ?';
            $params[] = $queryParams['category'];
        }
        if (!empty($queryParams['search'])) {
            $where[] = '(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
            $searchStr = '%' . $queryParams['search'] . '%';
            $params[] = $searchStr;
            $params[] = $searchStr;
            $params[] = $searchStr;
        }

        $sql = 'SELECT * FROM blog_posts WHERE ' . implode(' AND ', $where) . ' ORDER BY id DESC';
        $rows = DB::query($sql, $params);
        $posts = array_map([self::class, 'formatPost'], $rows);

        return [
            'success' => true,
            'data' => [
                'posts' => $posts,
                'count' => count($posts)
            ]
        ];
    }

    public static function getPublic(string $idOrSlug): array {
        $post = is_numeric($idOrSlug)
            ? DB::queryOne("SELECT * FROM blog_posts WHERE id = ? AND status = 'published'", [(int)$idOrSlug])
            : DB::queryOne("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'", [$idOrSlug]);

        if (!$post) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Post not found'];
        }

        return [
            'success' => true,
            'data' => [
                'post' => self::formatPost($post)
            ]
        ];
    }

    public static function listAdmin(array $queryParams): array {
        $where = ['1=1'];
        $params = [];

        if (!empty($queryParams['status']) && $queryParams['status'] !== 'all') {
            $where[] = 'status = ?';
            $params[] = $queryParams['status'];
        }
        if (!empty($queryParams['category'])) {
            $where[] = 'category = ?';
            $params[] = $queryParams['category'];
        }
        if (!empty($queryParams['search'])) {
            $where[] = '(title LIKE ? OR excerpt LIKE ?)';
            $searchStr = '%' . $queryParams['search'] . '%';
            $params[] = $searchStr;
            $params[] = $searchStr;
        }

        $sql = 'SELECT * FROM blog_posts WHERE ' . implode(' AND ', $where) . ' ORDER BY id DESC';
        $rows = DB::query($sql, $params);
        $posts = array_map([self::class, 'formatPost'], $rows);

        return [
            'success' => true,
            'data' => [
                'posts' => $posts,
                'count' => count($posts)
            ]
        ];
    }

    public static function getAdmin(int $id): array {
        $post = DB::queryOne('SELECT * FROM blog_posts WHERE id = ?', [$id]);
        if (!$post) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Post not found'];
        }
        return ['success' => true, 'data' => ['post' => self::formatPost($post)]];
    }

    public static function create(array $body): array {
        $title = trim($body['title'] ?? '');
        $slug = trim($body['slug'] ?? '');
        $category = trim($body['category'] ?? 'General');
        $excerpt = trim($body['excerpt'] ?? '');
        $content = trim($body['content'] ?? '');
        $readTime = trim($body['readTime'] ?? '4 min read');
        $featuredImageUrl = trim($body['featuredImageUrl'] ?? $body['featured_image_url'] ?? $body['imageUrl'] ?? $body['image_url'] ?? '');
        $status = trim($body['status'] ?? 'published');

        if (!$title || !$content) {
            http_response_code(400);
            return ['success' => false, 'message' => 'Title and content are required'];
        }

        if (!$slug) {
            $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($title)) . '-' . time();
        }

        DB::execute(
            'INSERT INTO blog_posts (title, slug, category, excerpt, content, read_time, featured_image_url, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [$title, $slug, $category, $excerpt, $content, $readTime, $featuredImageUrl, $status]
        );

        $newId = (int)DB::lastInsertId();
        return self::getAdmin($newId);
    }

    public static function update(int $id, array $body): array {
        $post = DB::queryOne('SELECT * FROM blog_posts WHERE id = ?', [$id]);
        if (!$post) {
            http_response_code(404);
            return ['success' => false, 'message' => 'Post not found'];
        }

        $title = $body['title'] ?? $post['title'];
        $slug = $body['slug'] ?? $post['slug'];
        $category = $body['category'] ?? $post['category'];
        $excerpt = $body['excerpt'] ?? $post['excerpt'];
        $content = $body['content'] ?? $post['content'];
        $readTime = $body['readTime'] ?? $post['read_time'];
        $featuredImageUrl = $body['featuredImageUrl'] ?? $body['featured_image_url'] ?? $body['imageUrl'] ?? $body['image_url'] ?? $post['featured_image_url'];
        $status = $body['status'] ?? $post['status'];

        DB::execute(
            'UPDATE blog_posts SET title = ?, slug = ?, category = ?, excerpt = ?, content = ?, read_time = ?, featured_image_url = ?, status = ?, updated_at = NOW() WHERE id = ?',
            [$title, $slug, $category, $excerpt, $content, $readTime, $featuredImageUrl, $status, $id]
        );

        return self::getAdmin($id);
    }

    public static function delete(int $id): array {
        DB::execute('DELETE FROM blog_posts WHERE id = ?', [$id]);
        return ['success' => true, 'message' => 'Post deleted successfully'];
    }
}
