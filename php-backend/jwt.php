<?php
// Native JWT Generator & Verifier (HMAC-SHA256)

class JWT {
    public static function encode(array $payload, string $secret): string {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode(json_encode($payload));
        
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode(string $token, string $secret) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }

        list($header, $payload, $signature) = $parts;
        $validSignature = self::base64UrlEncode(hash_hmac('sha256', $header . "." . $payload, $secret, true));

        if (!hash_equals($signature, $validSignature)) {
            return false;
        }

        $data = json_decode(self::base64UrlDecode($payload), true);
        if (!$data) {
            return false;
        }

        if (isset($data['exp']) && $data['exp'] < time()) {
            return false;
        }

        return $data;
    }

    private static function base64UrlEncode(string $data): string {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode(string $data): string {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }
}
