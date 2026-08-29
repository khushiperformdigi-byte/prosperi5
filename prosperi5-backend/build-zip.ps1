# Run from project root to build prosperi5-backend.zip for Hostinger

$server = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $server
$dist = Join-Path $root "dist"
$temp = Join-Path $root "backend-deploy-temp"
$zip = Join-Path $root "prosperi5-backend.zip"

if (Test-Path $temp) {
  cmd /c rmdir /s /q "$temp" 2>$null
}
if (Test-Path $zip) {
  Remove-Item $zip -Force -ErrorAction SilentlyContinue
}

New-Item -ItemType Directory -Path $temp -Force | Out-Null
robocopy $server $temp /E /XD node_modules public /XF .env .env.local | Out-Null

# Copy production .env
Copy-Item (Join-Path $server "env.hostinger.production") (Join-Path $temp ".env")

# Bundle built React frontend dist into public for one-shot Hostinger Web App deployment
if (Test-Path $dist) {
  $tempPublic = Join-Path $temp "public"
  New-Item -ItemType Directory -Path $tempPublic -Force | Out-Null
  robocopy $dist $tempPublic /E | Out-Null
}

Compress-Archive -Path "$temp\*" -DestinationPath $zip -Force
cmd /c rmdir /s /q "$temp" 2>$null

Write-Host "Created flat server bundle: $zip"
