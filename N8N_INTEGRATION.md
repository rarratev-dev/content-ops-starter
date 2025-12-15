# Integración n8n + Claude Code 🚀

Esta documentación explica cómo está configurada la integración entre n8n y Claude Code en este proyecto.

---

## 📁 Estructura de Archivos

```
content-ops-starter/
├── .mcp/
│   └── n8n-server/
│       ├── index.js           # Servidor MCP para n8n
│       ├── package.json       # Dependencias
│       ├── README.md          # Documentación técnica
│       └── WORKFLOWS.md       # Casos de uso y ejemplos
├── .mcp.json                  # Configuración de servidores MCP
└── N8N_INTEGRATION.md         # Esta guía
```

---

## ⚙️ Configuración

### Servidor MCP de n8n

El servidor MCP está instalado y configurado en `.mcp.json`:

```json
{
  "mcpServers": {
    "n8n": {
      "type": "stdio",
      "command": "node",
      "args": [".mcp/n8n-server/index.js"],
      "env": {
        "N8N_API_KEY": "tu_api_key",
        "N8N_BASE_URL": "https://n8n-n8n.nzlp7o.easypanel.host"
      }
    }
  }
}
```

### Credenciales

- **URL n8n:** `https://n8n-n8n.nzlp7o.easypanel.host`
- **API Key:** Configurada en `.mcp.json`

---

## 🎯 Funcionalidades Disponibles

Una vez que reinicies Claude Code, tendrás acceso a estas nuevas herramientas:

### 1. **Listar Workflows**
```
Tú: "Muéstrame todos los workflows de n8n"
Tú: "Lista solo los workflows activos"
```

### 2. **Ejecutar Workflows**
```
Tú: "Ejecuta el workflow 'Deploy to Production'"
Tú: "Ejecuta el workflow con ID abc123"
```

### 3. **Ver Ejecuciones**
```
Tú: "Muéstrame las últimas 10 ejecuciones"
Tú: "¿Cuál es el estado del workflow X?"
```

### 4. **Gestionar Workflows**
```
Tú: "Activa el workflow de backups"
Tú: "Desactiva el workflow de notificaciones"
```

---

## 💡 Casos de Uso

Para ver ejemplos detallados de automatizaciones, consulta:
- **[WORKFLOWS.md](./.mcp/n8n-server/WORKFLOWS.md)** - Casos de uso completos
- **[README.md](./.mcp/n8n-server/README.md)** - Documentación técnica

### Ejemplos Rápidos

#### Automatizar Deploy
```
n8n Workflow:
1. Webhook detecta push a main
2. Ejecuta tests
3. Si pasan → deploy
4. Notifica en Slack

Tú puedes:
"Ejecuta el deploy manualmente"
"¿Cuál fue el resultado del último deploy?"
```

#### Generar Contenido
```
Tú: "Crea 3 artículos sobre las nuevas features"
Claude: [Genera los archivos markdown]
Tú: "Ejecuta el workflow de publicación"
Claude: [n8n sube los archivos al CMS]
```

#### Sincronizar Datos
```
Cronjob en n8n (cada hora):
1. Fetch productos de Shopify
2. Claude Code optimiza descripciones
3. Publica en el sitio
4. Notifica cambios
```

---

## 🚀 Cómo Empezar

### Paso 1: Reinicia Claude Code

Para que los cambios surtan efecto, reinicia tu sesión de Claude Code.

### Paso 2: Verifica la Conexión

```
Tú: "Lista mis workflows de n8n"
```

Si ves una lista de workflows, ¡todo está funcionando! 🎉

### Paso 3: Crea tu Primer Workflow Automatizado

1. Ve a n8n: `https://n8n-n8n.nzlp7o.easypanel.host`
2. Crea un nuevo workflow simple (ej: webhook que responde "Hola")
3. Actívalo
4. Desde Claude Code: "Ejecuta el workflow 'Mi Test'"

---

## 🛠️ Troubleshooting

### "No puedo ver los workflows"

1. Verifica que `.mcp.json` exista en la raíz del proyecto
2. Reinicia Claude Code
3. Verifica que la API key sea válida

### "Error al ejecutar workflow"

1. Verifica que el workflow esté activo en n8n
2. Revisa los logs en n8n
3. Confirma que tienes permisos suficientes

### "Error de conexión"

1. Verifica que n8n esté corriendo
2. Prueba acceder a: `https://n8n-n8n.nzlp7o.easypanel.host`
3. Confirma que la API esté habilitada en n8n

---

## 🔐 Seguridad

### Variables de Entorno

Considera mover la API key a variables de entorno:

**.mcp.json:**
```json
{
  "mcpServers": {
    "n8n": {
      "env": {
        "N8N_API_KEY": "${N8N_API_KEY}",
        "N8N_BASE_URL": "${N8N_BASE_URL}"
      }
    }
  }
}
```

**En tu shell:**
```bash
export N8N_API_KEY="tu_api_key_aqui"
export N8N_BASE_URL="https://n8n-n8n.nzlp7o.easypanel.host"
```

### .gitignore

Asegúrate de que `.mcp.json` esté en `.gitignore` si contiene credenciales sensibles.

---

## 📚 Documentación Adicional

- **[Servidor MCP README](.mcp/n8n-server/README.md)** - Detalles técnicos
- **[Workflows y Casos de Uso](.mcp/n8n-server/WORKFLOWS.md)** - Ejemplos prácticos
- **[n8n API Docs](https://docs.n8n.io/api/)** - API oficial de n8n
- **[MCP Docs](https://code.claude.com/docs/en/mcp)** - Model Context Protocol

---

## 🎉 ¡Siguiente Paso!

Ahora que tienes n8n integrado con Claude Code, puedes:

1. **Automatizar deployments** - Push → Tests → Deploy automático
2. **Generar contenido** - Claude Code + n8n = contenido automatizado
3. **Monitorear y alertar** - Errores → Análisis → Notificación
4. **Sincronizar datos** - APIs → Procesamiento → CMS

**¡Empieza a automatizar tu flujo de trabajo! 🚀**

---

*Última actualización: 2025-12-15*
