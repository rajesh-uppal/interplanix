# move_interplanix_ssa_content.ps1

# Define source and destination
$source = "interplanix-ssa"
$destination = "interplanix\interplanix-ssa"

# Define folders to copy (exclude virtualenv-related dirs like 'Lib', 'etc')
$foldersToCopy = @(".github", "docs", "global_satellite_risk_tool", ".vscode")

Write-Host "Starting transfer from '$source' to '$destination'..." -ForegroundColor Cyan

foreach ($folder in $foldersToCopy) {
    $sourcePath = Join-Path $source $folder
    $destPath = Join-Path $destination $folder
    if (Test-Path $sourcePath) {
        Write-Host "Copying $folder ..." -ForegroundColor Yellow
        Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
    } else {
        Write-Host "Skipping missing folder: $folder" -ForegroundColor DarkGray
    }
}

# Optional individual files to copy (add more if needed)
$filesToCopy = @("README.md", ".gitignore")
foreach ($file in $filesToCopy) {
    $sourceFile = Join-Path $source $file
    $destFile = Join-Path $destination $file
    if (Test-Path $sourceFile) {
        Write-Host "Copying file: $file ..." -ForegroundColor Yellow
        Copy-Item -Path $sourceFile -Destination $destFile -Force
    }
}

Write-Host "Transfer complete. Please review and commit changes from inside the monorepo." -ForegroundColor Green
