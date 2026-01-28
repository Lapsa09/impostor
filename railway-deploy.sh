#!/bin/bash

echo "🚂 Railway Quick Deploy - Sin OAuth"
echo "===================================="
echo ""

# Verificar si Railway CLI está instalado
if ! command -v railway &> /dev/null
then
    echo "📦 Railway CLI no encontrado. Instalando..."
    npm install -g @railway/cli
    echo "✅ Railway CLI instalado"
else
    echo "✅ Railway CLI ya instalado"
fi

echo ""
echo "🔐 Paso 1: Login en Railway"
echo "Se abrirá tu navegador para autenticarte..."
sleep 2
railway login

echo ""
echo "🎯 Paso 2: Inicializando proyecto..."
railway init

echo ""
echo "⚙️ Paso 3: Configurando variables de entorno..."
railway variables set NODE_ENV=production
railway variables set HOSTNAME=0.0.0.0

echo ""
echo "🚀 Paso 4: Deploying..."
railway up

echo ""
echo "🌐 Obteniendo dominio..."
DOMAIN=$(railway domain)

echo ""
echo "✅ ¡Deploy completado!"
echo ""
echo "Tu aplicación está en: $DOMAIN"
echo ""
echo "📋 Próximos pasos:"
echo "1. Actualizar ALLOWED_ORIGINS con tu dominio:"
echo "   railway variables set ALLOWED_ORIGINS=$DOMAIN"
echo ""
echo "2. Ver logs en tiempo real:"
echo "   railway logs"
echo ""
echo "3. Abrir en navegador:"
echo "   railway open"
