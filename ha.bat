@echo off
:: Navigate to the folder where the script is located
cd /d "%~dp0"

echo === Checking Git Status ===
git status
echo.

:: Ask for your commit message
set /p commit_msg="Enter your commit message: "

:: If you just press enter without typing anything, it defaults to 'Update'
if "%commit_msg%"=="" set commit_msg=Update

echo.
echo === Adding changes ===
git add .

echo === Committing changes ===
git commit -m "%commit_msg%"

echo === Pushing to GitHub (origin main) ===
git push origin main

echo.
echo === Done! Vercel is now deploying your changes. ===
pause