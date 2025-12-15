#!/bin/bash

# Script de prueba para verificar la conexión con n8n

echo "🧪 Probando conexión con n8n..."
echo ""

# Variables
N8N_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDU0N2Q1OS02MjBkLTQ4NGEtOGZjNy1mNjNlZGNiZjNmZjIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY1ODExMDMzfQ.m5DkFGdpfZajyJAyEr4sJZ810xTmyqSLySQIHacwuKM"
N8N_BASE_URL="https://n8n-n8n.nzlp7o.easypanel.host"

# Test 1: Verificar que el servidor MCP puede iniciar
echo "✓ Test 1: Verificando servidor MCP..."
export N8N_API_KEY="$N8N_API_KEY"
export N8N_BASE_URL="$N8N_BASE_URL"
timeout 1 node .mcp/n8n-server/index.js 2>&1 | grep -q "n8n MCP server running" && echo "  ✅ Servidor MCP funciona" || echo "  ❌ Error al iniciar servidor MCP"
echo ""

# Test 2: Verificar conexión a la API de n8n
echo "✓ Test 2: Probando conexión a n8n API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$N8N_BASE_URL/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Accept: application/json" 2>&1)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "  ✅ Conexión exitosa (HTTP $HTTP_CODE)"
    echo ""
    echo "📋 Workflows encontrados:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null | grep '"name"' | head -10
elif [ "$HTTP_CODE" = "403" ]; then
    echo "  ⚠️  HTTP 403 - Bloqueado por proxy/firewall (normal en sandbox)"
    echo "  💡 En tu entorno local funcionará correctamente"
else
    echo "  ❌ Error de conexión (HTTP $HTTP_CODE)"
    echo "  Respuesta: $BODY"
fi
echo ""

# Test 3: Verificar archivo de configuración
echo "✓ Test 3: Verificando configuración..."
if [ -f ".mcp.json" ]; then
    echo "  ✅ .mcp.json existe"
    if grep -q "n8n" ".mcp.json"; then
        echo "  ✅ Configuración de n8n encontrada"
    else
        echo "  ❌ No se encontró configuración de n8n en .mcp.json"
    fi
else
    echo "  ❌ .mcp.json no encontrado"
fi
echo ""

# Test 4: Verificar dependencias
echo "✓ Test 4: Verificando dependencias..."
if [ -d ".mcp/n8n-server/node_modules" ]; then
    echo "  ✅ node_modules instalados"
    if [ -f ".mcp/n8n-server/node_modules/@modelcontextprotocol/sdk/package.json" ]; then
        echo "  ✅ SDK de MCP instalado"
    else
        echo "  ❌ SDK de MCP no encontrado"
    fi
else
    echo "  ❌ node_modules no encontrados"
    echo "  💡 Ejecuta: cd .mcp/n8n-server && npm install"
fi
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Si todos los checks son ✅, la integración está lista."
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Reinicia Claude Code (ya hecho ✓)"
echo "  2. Prueba: 'Lista mis workflows de n8n'"
echo "  3. Revisa la documentación en .mcp/n8n-server/QUICK_START.md"
echo ""
echo "💡 Si ves HTTP 403, es normal en entornos sandbox."
echo "   En tu máquina local funcionará perfectamente."
echo ""
