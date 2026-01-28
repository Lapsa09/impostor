#!/bin/bash

echo "🔍 Verificando configuración para deployment..."

# Verificar que existan archivos críticos
files=("server.ts" "next.config.ts" "package.json" "Dockerfile" "railway.json")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file existe"
  else
    echo "❌ $file no encontrado"
    exit 1
  fi
done

# Verificar scripts en package.json
if grep -q '"build"' package.json && grep -q '"start"' package.json; then
  echo "✅ Scripts de build y start configurados"
else
  echo "❌ Falta configurar scripts en package.json"
  exit 1
fi

# Verificar output standalone en next.config
if grep -q "standalone" next.config.ts; then
  echo "✅ Output standalone configurado"
else
  echo "⚠️  Advertencia: output standalone no configurado"
fi

# Test de build local
echo ""
echo "🏗️  Probando build local..."
pnpm run build

if [ $? -eq 0 ]; then
  echo "✅ Build exitoso"
else
  echo "❌ Build falló"
  exit 1
fi

echo ""
echo "✨ ¡Todo listo para deployment!"
echo ""
echo "Próximos pasos:"
echo "1. Hacer commit de los cambios: git add . && git commit -m 'ready for deployment'"
echo "2. Push a GitHub: git push"
echo "3. Ir a Railway.app y conectar el repositorio"
echo "4. Configurar ALLOWED_ORIGINS con tu dominio"
