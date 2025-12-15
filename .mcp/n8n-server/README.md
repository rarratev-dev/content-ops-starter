# n8n MCP Server

Servidor MCP personalizado para integrar n8n con Claude Code.

## ✨ Características

Este servidor MCP te permite controlar n8n directamente desde conversaciones con Claude Code:

- 📋 **list_workflows** - Lista todos los workflows
- ▶️ **execute_workflow** - Ejecuta workflows por ID o nombre
- 📊 **get_executions** - Consulta ejecuciones recientes
- 🔍 **get_workflow** - Obtiene detalles de un workflow
- ✅ **activate_workflow** - Activa un workflow
- ⏸️ **deactivate_workflow** - Desactiva un workflow

## 🚀 Configuración

### Instalación

Las dependencias ya están instaladas en `.mcp/n8n-server/node_modules`.

### Configuración en .mcp.json

El servidor está configurado en `/home/user/content-ops-starter/.mcp.json`:

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

## 📖 Ejemplos de Uso

Una vez configurado, puedes usar comandos naturales:

### Listar Workflows

```
Tú: "Muéstrame todos los workflows en n8n"
Claude: [Lista todos los workflows con sus IDs y estado]
```

### Ejecutar Workflow

```
Tú: "Ejecuta el workflow 'Deploy to Production'"
Claude: [Ejecuta el workflow y muestra el resultado]
```

### Ver Ejecuciones Recientes

```
Tú: "Muéstrame las últimas 5 ejecuciones de workflows"
Claude: [Muestra las ejecuciones con su estado]
```

### Activar/Desactivar Workflows

```
Tú: "Activa el workflow de backup diario"
Claude: [Activa el workflow]

Tú: "Desactiva el workflow de notificaciones"
Claude: [Desactiva el workflow]
```

## 🔧 API de n8n

Este servidor usa la API REST de n8n:
- Base URL: `https://n8n-n8n.nzlp7o.easypanel.host`
- Autenticación: API Key en header `X-N8N-API-KEY`

## 🛠️ Troubleshooting

### Error: N8N_API_KEY environment variable is required

Verifica que `.mcp.json` tenga la API key configurada correctamente.

### Error: Failed to connect to n8n

Verifica que:
1. La URL de n8n sea correcta
2. La API esté habilitada en n8n
3. La API key sea válida
4. Tengas conexión a internet

## 📚 Más Información

- [n8n API Documentation](https://docs.n8n.io/api/)
- [MCP Documentation](https://code.claude.com/docs/en/mcp)
