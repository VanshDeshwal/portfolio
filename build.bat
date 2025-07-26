@echo off
REM Portfolio Build Script for Windows
REM This script helps with development and deployment tasks

echo 🚀 Portfolio Build Script
echo ========================

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: Please run this script from the portfolio root directory
    exit /b 1
)

if "%1"=="size" goto check_sizes
if "%1"=="validate" goto validate_all
if "%1"=="optimize" goto optimize
if "%1"=="" goto all

:check_sizes
echo 📊 Checking file sizes...
if exist "styles.css" (
    for %%A in ("styles.css") do echo   styles.css: %%~zA bytes
)
if exist "assets\css\components.css" (
    for %%A in ("assets\css\components.css") do echo   components.css: %%~zA bytes
)
if exist "assets\css\animations.css" (
    for %%A in ("assets\css\animations.css") do echo   animations.css: %%~zA bytes
)
if exist "script.js" (
    for %%A in ("script.js") do echo   script.js: %%~zA bytes
)
if exist "index.html" (
    for %%A in ("index.html") do echo   index.html: %%~zA bytes
)
if not "%1"=="size" goto validate_all
goto end

:validate_all
echo.
echo 🔍 Validating project structure...
findstr /C:"<title>" index.html >nul && echo   ✅ Title tag found || echo   ❌ Title tag missing
findstr /C:"viewport" index.html >nul && echo   ✅ Viewport meta tag found || echo   ❌ Viewport meta tag missing
findstr /C:"theme-toggle" index.html >nul && echo   ✅ Theme toggle found || echo   ❌ Theme toggle missing

echo.
echo 🎨 Validating CSS structure...
findstr /C:":root" styles.css >nul && echo   ✅ CSS custom properties found || echo   ❌ CSS custom properties missing
findstr /C:"@media" styles.css >nul && echo   ✅ Responsive styles found || echo   ❌ Responsive styles missing

echo.
echo 📜 Validating JavaScript structure...
findstr /C:"class.*Manager" script.js >nul && echo   ✅ Modular class structure found || echo   ❌ Modular class structure missing
findstr /C:"addEventListener" script.js >nul && echo   ✅ Event listeners found || echo   ❌ Event listeners missing

if not "%1"=="validate" goto optimize
goto end

:optimize
echo.
echo ⚡ Optimization suggestions:
echo   • Consider minifying CSS and JavaScript for production
echo   • Optimize images in assets/images/ directory
echo   • Enable gzip compression on server
echo   • Add Content-Delivery-Network (CDN) for better performance
if not "%1"=="optimize" goto end_all
goto end

:all
call :check_sizes
call :validate_all
call :optimize

:end_all
echo.
echo ✅ Build script completed!
echo 🌐 Ready for deployment at https://vanshdeshwal.dev
goto end

:end
