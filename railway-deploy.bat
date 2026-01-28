@echo off
echo 🚂 Railway Quick Deploy - Sin OAuth
echo ====================================
echo.

REM Verificar si Railway CLI está instalado
where railway >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Railway CLI no encontrado. Instalando...
    call npm install -g @railway/cli
    echo ✅ Railway CLI instalado
) else (
    echo ✅ Railway CLI ya instalado
)

echo.
echo 🔐 Paso 1: Login en Railway
echo Se abrirá tu navegador para autenticarte...
timeout /t 2 >nul
call railway login

echo.
echo 🎯 Paso 2: Inicializando proyecto...
call railway init

echo.
echo ⚙️ Paso 3: Configurando variables de entorno...
call railway variables set NODE_ENV=production
call railway variables set HOSTNAME=0.0.0.0

echo.
echo 🚀 Paso 4: Deploying...
call railway up

echo.
echo ✅ ¡Deploy completado!
echo.
echo 📋 Próximos pasos:
echo 1. Ver tu dominio:
echo    railway domain
echo.
echo 2. Actualizar ALLOWED_ORIGINS:
echo    railway variables set ALLOWED_ORIGINS=https://tu-dominio.railway.app
echo.
echo 3. Ver logs:
echo    railway logs
echo.
echo 4. Abrir en navegador:
echo    railway open
echo.
pause
