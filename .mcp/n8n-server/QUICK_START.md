# 🚀 Inicio Rápido: n8n + Claude Code

## ✅ Configuración Completa

¡Todo está listo! Aquí está el resumen de lo que se configuró:

### 1. Archivos Creados ✓

```
content-ops-starter/
├── .mcp.json                      ← Credenciales de n8n (ignorado por git)
└── .mcp/n8n-server/
    ├── index.js                   ← Servidor MCP
    ├── package.json               ← Dependencias
    ├── package-lock.json          ← Lock file
    ├── node_modules/              ← Instaladas (ignorado por git)
    ├── README.md                  ← Documentación técnica
    ├── WORKFLOWS.md               ← Casos de uso
    └── QUICK_START.md             ← Esta guía
```

### 2. Configuración ✓

**Archivo:** `.mcp.json`
```json
{
  "mcpServers": {
    "n8n": {
      "type": "stdio",
      "command": "node",
      "args": [".mcp/n8n-server/index.js"],
      "env": {
        "N8N_API_KEY": "tu_api_key_aqui",
        "N8N_BASE_URL": "https://n8n-n8n.nzlp7o.easypanel.host"
      }
    }
  }
}
```

### 3. Dependencias Instaladas ✓

```bash
✓ @modelcontextprotocol/sdk@^0.5.0
✓ node-fetch@^3.3.2
```

---

## 🎯 Cómo Usar

### Paso 1: Reiniciar Claude Code

Para que el servidor MCP se cargue, necesitas **reiniciar tu sesión de Claude Code**.

**Opciones:**

**A) Si estás en la terminal:**
```bash
# Sal de Claude Code y vuelve a entrar
exit
claude code
```

**B) Si estás en el web:**
- Recarga la página
- O cierra y vuelve a abrir la pestaña

**C) Si estás en el IDE:**
- Reinicia la extensión de Claude Code

---

### Paso 2: Verificar que Funciona

Una vez reiniciado, prueba:

```
Tú: "Lista mis workflows de n8n"
```

Si ves una lista de workflows (o un mensaje diciendo que no hay workflows), **¡funciona!** 🎉

---

## 📖 Comandos Que Puedes Usar

Una vez configurado, puedes usar lenguaje natural para controlar n8n:

### Listar Workflows
```
"Muéstrame todos los workflows"
"Lista los workflows activos"
"¿Qué workflows tengo en n8n?"
```

### Ejecutar Workflows
```
"Ejecuta el workflow de deploy"
"Ejecuta el workflow 'Publicar Contenido'"
"Ejecuta el workflow con ID abc123"
```

### Ver Ejecuciones
```
"Muéstrame las últimas 10 ejecuciones"
"¿Cuál es el estado del último workflow?"
"Muestra las ejecuciones del workflow de backup"
```

### Activar/Desactivar
```
"Activa el workflow de notificaciones"
"Desactiva el workflow de emails"
"Pausa el workflow de sync"
```

### Obtener Detalles
```
"Muéstrame los detalles del workflow X"
"Dame información sobre el workflow abc123"
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Deploy Automatizado

**Tu workflow en n8n:**
- Nombre: "Deploy to Production"
- Trigger: Manual o webhook
- Pasos: Build → Test → Deploy

**Desde Claude Code:**
```
Tú: "Hice cambios en el código, ejecuta el deploy"
Claude: "Ejecutando el workflow 'Deploy to Production'..."
        [Muestra el resultado]
```

### Ejemplo 2: Generar Contenido + Publicar

**Flujo combinado:**
```
Tú: "Genera 3 artículos sobre Next.js 15"
Claude: [Crea archivos markdown]
        "He creado 3 artículos. ¿Los publico?"

Tú: "Sí, ejecuta el workflow de publicación"
Claude: [Ejecuta workflow en n8n]
        "Artículos publicados exitosamente!"
```

### Ejemplo 3: Monitoreo y Alertas

**Flujo automático:**
```
[n8n detecta error en producción]
  ↓
[Webhook a Claude Code]
  ↓
Claude: "Detecté un error 500 en /api/products.
        Analicé los logs y el problema es X.
        ¿Quieres que cree un fix?"
```

---

## 🔧 Troubleshooting

### "No veo los workflows"

**Solución:**
1. Verifica que reiniciaste Claude Code
2. Comprueba que `.mcp.json` existe en la raíz del proyecto
3. Verifica que n8n esté corriendo: https://n8n-n8n.nzlp7o.easypanel.host
4. Confirma que la API key sea válida

### "Error al ejecutar workflow"

**Solución:**
1. Verifica que el workflow esté activo en n8n
2. Revisa los logs en n8n UI
3. Confirma que tienes permisos para ejecutar el workflow

### "Error de conexión"

**Solución:**
1. Verifica que la URL de n8n sea correcta
2. Confirma que tienes conexión a internet
3. Revisa que la API esté habilitada en n8n (Settings → API)

---

## 📚 Documentación Adicional

- **[N8N_INTEGRATION.md](../../N8N_INTEGRATION.md)** - Guía completa de integración
- **[README.md](./README.md)** - Documentación técnica del servidor MCP
- **[WORKFLOWS.md](./WORKFLOWS.md)** - Casos de uso detallados y ejemplos avanzados

---

## 🎉 ¡Siguiente Paso!

**Ahora que todo está configurado:**

1. ✅ Reinicia Claude Code
2. ✅ Prueba: "Lista mis workflows de n8n"
3. ✅ Explora los casos de uso en WORKFLOWS.md
4. ✅ ¡Empieza a automatizar!

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas, pregúntame:
- "¿Cómo configuro un workflow de deploy en n8n?"
- "Muéstrame ejemplos de automatización para content-ops-starter"
- "¿Cómo hago que n8n me notifique cuando hay errores?"

**¡Disfruta de la automatización!** 🚀
