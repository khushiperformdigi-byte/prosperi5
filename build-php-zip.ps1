# Build prosperi5-php-backend.zip for Hostinger Native PHP Deployment

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }
$phpDir = Join-Path $root "php-backend"
$dist = Join-Path $root "dist"
$temp = Join-Path $root "php-deploy-temp"
$zip = Join-Path $root "prosperi5-php-backend.zip"

if (Test-Path $temp) { cmd /c rmdir /s /q "$temp" 2>$null }
if (Test-Path $zip) { Remove-Item $zip -Force -ErrorAction SilentlyContinue }

New-Item -ItemType Directory -Path $temp -Force | Out-Null
robocopy $phpDir $temp /E | Out-Null

# Copy built React frontend dist into public
if (Test-Path $dist) {
  $tempPublic = Join-Path $temp "public"
  New-Item -ItemType Directory -Path $tempPublic -Force | Out-Null
  robocopy $dist $tempPublic /E | Out-Null
}

# Create Linux-compatible ZIP with forward-slash '/' path separators
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$archive = [System.IO.Compression.ZipFile]::Open($zip, [System.IO.Compression.ZipArchiveMode]::Create)
Get-ChildItem -Path $temp -Recurse -Force | ForEach-Object {
    if (-not $_.PSIsContainer) {
        $relativePath = $_.FullName.Substring($temp.Length + 1).Replace("\", "/")
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $relativePath, [System.IO.Compression.CompressionLevel]::Optimal)
    }
}
$archive.Dispose()

cmd /c rmdir /s /q "$temp" 2>$null

Write-Host "Created PHP backend bundle: $zip"
