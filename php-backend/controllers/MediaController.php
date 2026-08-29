<?php
// Media Controller

require_once __DIR__ . '/../db.php';

class MediaController {
    public static function serve(int $id) {
        $media = DB::queryOne('SELECT filename, mime_type, data FROM media_assets WHERE id = ?', [$id]);
        if (!$media || empty($media['data'])) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Media file not found']);
            exit;
        }

        header('Content-Type: ' . $media['mime_type']);
        header('Content-Disposition: inline; filename="' . $media['filename'] . '"');
        header('Cache-Control: public, max-age=31536000');
        echo $media['data'];
        exit;
    }

    public static function upload(): array {
        if (empty($_FILES['file'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'No file uploaded'];
        }

        $file = $_FILES['file'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            return ['success' => false, 'message' => 'File upload error: ' . $file['error']];
        }

        $filename = basename($file['name']);
        $mimeType = $file['type'] ?: mime_content_type($file['tmp_name']);
        $data = file_get_contents($file['tmp_name']);
        $altText = $_POST['altText'] ?? '';

        DB::execute(
            'INSERT INTO media_assets (filename, mime_type, data, alt_text, created_at) VALUES (?, ?, ?, ?, NOW())',
            [$filename, $mimeType, $data, $altText]
        );

        $newId = (int)DB::lastInsertId();
        $mediaUrl = APP_URL . '/api/media/' . $newId;

        return [
            'success' => true,
            'data' => [
                'media' => [
                    'id' => $newId,
                    'filename' => $filename,
                    'mimeType' => $mimeType,
                    'url' => $mediaUrl,
                    'altText' => $altText
                ]
            ]
        ];
    }

    public static function uploadFromUrl(array $body): array {
        $url = trim($body['url'] ?? '');
        $altText = trim($body['altText'] ?? '');

        if (!$url) {
            http_response_code(400);
            return ['success' => false, 'message' => 'URL is required'];
        }

        $data = @file_get_contents($url);
        if ($data === false) {
            http_response_code(400);
            return ['success' => false, 'message' => 'Unable to download image from URL'];
        }

        $filename = basename(parse_url($url, PHP_URL_PATH)) ?: 'downloaded_image.jpg';
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->buffer($data) ?: 'image/jpeg';

        DB::execute(
            'INSERT INTO media_assets (filename, mime_type, data, alt_text, created_at) VALUES (?, ?, ?, ?, NOW())',
            [$filename, $mimeType, $data, $altText]
        );

        $newId = (int)DB::lastInsertId();
        $mediaUrl = APP_URL . '/api/media/' . $newId;

        return [
            'success' => true,
            'data' => [
                'media' => [
                    'id' => $newId,
                    'filename' => $filename,
                    'mimeType' => $mimeType,
                    'url' => $mediaUrl,
                    'altText' => $altText
                ]
            ]
        ];
    }
}
