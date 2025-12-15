# n8n + Claude Code: Casos de Uso y Workflows

Guía completa de integración entre n8n y Claude Code para automatizar tu flujo de desarrollo.

---

## 🎯 Casos de Uso Prácticos

### 1. **CI/CD Automatizado**

#### Workflow en n8n: "Deploy Automático"

**Trigger:** Webhook cuando hay push a rama main
**Pasos:**
1. Webhook recibe evento de GitHub
2. Ejecuta tests
3. Si pasan → trigger deploy
4. Notifica en Slack

**Cómo Claude Code ayuda:**
```
Tú: "Ejecuta el workflow de deploy a producción"
Claude: [Ejecuta el workflow y te muestra el progreso]
```

**Configuración del workflow en n8n:**
- Nodo 1: Webhook (recibe POST de GitHub)
- Nodo 2: HTTP Request (llama a API de tests)
- Nodo 3: IF (¿tests pasaron?)
- Nodo 4: HTTP Request (deploy)
- Nodo 5: Slack notificación

---

### 2. **Generación de Contenido Automatizada**

#### Workflow: "Generar Blog Post"

**Trigger:** Manual o programado
**Pasos:**
1. Lee datos de una fuente (Google Sheets, DB)
2. Llama a Claude Code para generar contenido
3. Guarda en CMS (Contentful/Strapi)
4. Publica automáticamente

**Desde tu conversación con Claude Code:**
```
Tú: "Genera 5 artículos sobre las nuevas features"
Claude: [Crea los archivos markdown]
Tú: "Ejecuta el workflow 'Publicar a CMS'"
Claude: [Ejecuta n8n workflow que sube los archivos]
```

**Configuración del workflow en n8n:**
- Nodo 1: Schedule Trigger (diario/semanal)
- Nodo 2: Google Sheets (lee topics)
- Nodo 3: Webhook a Claude Code (genera contenido)
- Nodo 4: Contentful/Strapi (publica)
- Nodo 5: Email notificación

---

### 3. **Monitoreo y Alertas**

#### Workflow: "Monitor de Errores"

**Trigger:** Webhook cuando hay error en producción
**Pasos:**
1. Recibe log de error
2. Envía a Claude Code para análisis
3. Claude Code genera reporte + sugerencia de fix
4. Crea issue en GitHub
5. Notifica al equipo

**Ejemplo:**
```
[n8n detecta error 500 en API]
  ↓
[n8n envía logs a Claude Code]
  ↓
Claude: "Analicé el error. Es un problema de timeout en la DB.
        He creado un branch con la solución propuesta."
  ↓
[n8n notifica en Slack con link al PR]
```

**Configuración del workflow en n8n:**
- Nodo 1: Webhook (recibe alertas)
- Nodo 2: HTTP Request a Claude Code API
- Nodo 3: GitHub Create Issue
- Nodo 4: Slack Message

---

### 4. **Sincronización de Datos**

#### Workflow: "Sync Products"

**Para tu proyecto content-ops-starter:**
Sincronizar productos/contenido entre múltiples plataformas.

**Trigger:** Programado (cada hora)
**Pasos:**
1. Lee productos de Shopify/WooCommerce
2. Procesa con Claude Code (optimiza descripciones, SEO)
3. Actualiza en CMS
4. Regenera sitio estático

**Ejemplo:**
```
Tú: "Sincroniza los productos nuevos"
Claude: [Ejecuta workflow de n8n]
        "Se sincronizaron 15 productos nuevos.
         Optimicé las descripciones para SEO.
         El sitio se está regenerando..."
```

---

### 5. **Automatización de Tareas Repetitivas**

#### Workflow: "Actualizar Dependencias"

**Trigger:** Semanal (lunes 9am)
**Pasos:**
1. n8n ejecuta `npm outdated`
2. Envía lista a Claude Code
3. Claude Code actualiza `package.json`
4. Ejecuta tests
5. Si pasan → crea PR
6. Notifica para revisión

**Desde tu conversación:**
```
Tú: "Revisa si hay actualizaciones de dependencias"
Claude: [Ejecuta workflow]
        "Encontré 8 actualizaciones disponibles:
         - next: 15.5.6 → 15.6.0
         - react: 18.2.0 → 18.3.0
         ...
         ¿Quieres que cree un PR con las actualizaciones?"

Tú: "Sí, pero solo las minor versions"
Claude: [Actualiza y crea PR]
```

---

## 🔧 Configuraciones Útiles

### Webhook para Claude Code

Crea un workflow en n8n con webhook para recibir comandos:

**URL del webhook:**
```
https://n8n-n8n.nzlp7o.easypanel.host/webhook/claude-code
```

**Ejemplo de nodo Webhook en n8n:**
```json
{
  "method": "POST",
  "path": "claude-code",
  "responseMode": "responseNode"
}
```

**Desde Claude Code, ejecutar:**
```javascript
// Puedo ejecutar esto automáticamente
fetch('https://n8n-n8n.nzlp7o.easypanel.host/webhook/claude-code', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'deploy',
    branch: 'main',
    environment: 'production'
  })
});
```

---

## 📊 Workflows Recomendados para content-ops-starter

### 1. **Publicar Contenido**

```
Trigger: Manual
Pasos:
1. Validar markdown files
2. Optimizar imágenes
3. Generar metadatos SEO
4. Commit + Push
5. Deploy a Vercel/Netlify
6. Ping Google Search Console
```

**Uso:**
```
Tú: "Publica el nuevo artículo sobre Next.js 15"
Claude: [Prepara los archivos]
        "Ejecuta el workflow 'Publicar Contenido' en n8n"
```

### 2. **Backup Automático**

```
Trigger: Diario (3am)
Pasos:
1. Exportar contenido
2. Comprimir archivos
3. Subir a S3/Drive
4. Notificar si hay errores
```

### 3. **Generar Newsletter**

```
Trigger: Semanal (viernes)
Pasos:
1. Recopilar artículos de la semana
2. Claude Code genera resumen
3. Formatear para email
4. Enviar a lista (Mailchimp/SendGrid)
5. Publicar en web
```

---

## 🚀 Cómo Empezar

### Paso 1: Crea tu primer workflow en n8n

1. Abre n8n: `https://n8n-n8n.nzlp7o.easypanel.host`
2. Crea nuevo workflow
3. Agrega nodo "Webhook"
4. Agrega nodo "HTTP Request" o lógica personalizada
5. Activa el workflow

### Paso 2: Pruébalo desde Claude Code

```
Tú: "Lista mis workflows de n8n"
Claude: [Muestra todos los workflows]

Tú: "Ejecuta el workflow 'Mi Primer Test'"
Claude: [Ejecuta y muestra resultado]
```

### Paso 3: Automatiza todo

Combina n8n triggers + Claude Code para automatizar:
- Deployments
- Testing
- Generación de contenido
- Reportes
- Notificaciones
- Y mucho más!

---

## 💡 Tips y Mejores Prácticas

### 1. **Usa nombres descriptivos**
```
✅ "Deploy to Production"
✅ "Generate Weekly Report"
❌ "Workflow 1"
❌ "Test"
```

### 2. **Agrega manejo de errores**
Siempre incluye nodos de error en n8n para capturar fallos.

### 3. **Documenta tus workflows**
Usa el campo "Notes" en n8n para explicar qué hace cada workflow.

### 4. **Prueba primero en staging**
Crea versiones de test antes de automatizar producción.

### 5. **Monitorea las ejecuciones**
```
Tú: "Muéstrame las últimas 10 ejecuciones"
Claude: [Lista con estados: success/error/running]
```

---

## 🎓 Recursos Adicionales

- **n8n Docs:** https://docs.n8n.io
- **n8n Templates:** https://n8n.io/workflows
- **Claude Code MCP:** [README.md](./README.md)

---

## 🤝 Soporte

Si tienes problemas:
1. Verifica que n8n esté corriendo
2. Confirma que la API key sea válida
3. Revisa los logs de n8n
4. Pregúntame: "Claude, ayúdame con el workflow X"

¡Empieza a automatizar tu flujo de trabajo hoy! 🚀
