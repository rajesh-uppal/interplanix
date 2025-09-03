<#
  Cleanup Script for global-satellite-risk-tool
  ------------------------------------------------
  Tasks:
   1. Backup current project
   2. Move all TLE files into data/
   3. Consolidate HTML map into docs/
   4. Archive redundant notebooks and old visualizations
   5. Remove obsolete folders
   6. Update .gitignore
   7. Stage & commit changes to Git
#>

Write-Host "🚀 Starting cleanup for global-satellite-risk-tool..." -ForegroundColor Cyan

# --- 1) Backup whole project ---
$BACKUP_ROOT = "C:\Users\DELL\OneDrive\Desktop\Interplanix\backups"
$TIMESTAMP = (Get-Date).ToString("yyyyMMdd_HHmmss")
$BACKUP_DIR = Join-Path $BACKUP_ROOT "global_satellite_cleanup_$TIMESTAMP"

New-Item -Path $BACKUP_DIR -ItemType Directory -Force | Out-Null
Copy-Item -Path (Get-Location) -Destination $BACKUP_DIR -Recurse -Force
Write-Host "✅ Backup created at: $BACKUP_DIR" -ForegroundColor Green

# --- 2) Move TLE files into data/ ---
New-Item -ItemType Directory -Path .\data -Force | Out-Null
Get-ChildItem -Path . -Filter "tle_data*.txt" -Recurse -File |
    Where-Object { $_.DirectoryName -notlike "*\data" } |
    ForEach-Object { Move-Item -Path $_.FullName -Destination (Join-Path $PWD "data") -Force }
Write-Host "✅ Consolidated TLE files into data/" -ForegroundColor Green

# --- 3) Consolidate HTML map to docs/ ---
$latestHtml = Get-ChildItem -Path . -Include "satellite_risk_map_sample.html" -Recurse -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestHtml) {
    Copy-Item -Path $latestHtml.FullName -Destination (Join-Path $PWD "docs\satellite_risk_map_sample.html") -Force
    Write-Host "✅ Copied latest HTML map to docs/satellite_risk_map_sample.html" -ForegroundColor Green
}
if (Test-Path ".\notebooks\docs") {
    Remove-Item -Path ".\notebooks\docs" -Recurse -Force
    Write-Host "🗑️ Removed notebooks/docs folder" -ForegroundColor Yellow
}

# --- 4) Archive redundant notebooks ---
Get-ChildItem -Path .\notebooks -Recurse -File -Include "*_fixed*.ipynb","*_clean*.ipynb","*backup*.ipynb" |
    ForEach-Object { Move-Item -Path $_.FullName -Destination $BACKUP_DIR -Force }

    Write-Host "✅ Archived redundant notebooks to backup" -ForegroundColor Green

# --- 5) Archive old visualization outputs (keep latest 2) ---
$keep = 2
$allHtmls = Get-ChildItem -Path .\visualizations\risk_maps -Filter "*_satellite_risk_map.html" -File | Sort-Object LastWriteTime -Descending
$allHtmls | Select-Object -Skip $keep | ForEach-Object { Move-Item -Path $_.FullName -Destination $BACKUP_DIR -Force }

$allCSVs = Get-ChildItem -Path .\visualizations\risk_maps -Filter "*_risk_data.csv" -File | Sort-Object LastWriteTime -Descending
$allCSVs | Select-Object -Skip $keep | ForEach-Object { Move-Item -Path $_.FullName -Destination $BACKUP_DIR -Force }

Write-Host "✅ Archived older visualizations to backup (kept latest 2)" -ForegroundColor Green

# --- 6) Remove obsolete folders ---
if (Test-Path ".\docs\satellite-risk-map") {
    Remove-Item -Path ".\docs\satellite-risk-map" -Recurse -Force
    Write-Host "🗑️ Removed docs/satellite-risk-map folder" -ForegroundColor Yellow
}

# --- 7) Update .gitignore ---
@"
# ignore generated outputs and backups
visualizations/risk_maps/*.html
visualizations/risk_maps/*.csv
backups/
**/.ipynb_checkpoints/
__pycache__/
*.pyc
"@ | Out-File -FilePath .\.gitignore -Encoding utf8 -Append
Write-Host "✅ Updated .gitignore" -ForegroundColor Green

# --- 8) Stage, commit, and push ---
git add -A
git commit -m "chore: cleanup repo — consolidate TLEs, archive old notebooks/visualizations"
git push origin main

# --- 8) Stage, commit, and push ---
git add -A
git commit -m "chore: cleanup repo - consolidate TLEs, archive old notebooks/visualizations"
git push origin main


Write-Host "Cleanup complete and pushed to GitHub!" -ForegroundColor Cyan
