# 📋 Workflows de Ejemplo para n8n

Estos son workflows simples que puedes crear en n8n para probar la integración con Claude Code.

---

## 🎯 Workflow #1: "Hola Mundo" (Más Simple)

**Propósito:** Probar que Claude Code puede ejecutar workflows.

### Cómo Crearlo en n8n:

1. Ve a tu n8n: https://n8n-n8n.nzlp7o.easypanel.host
2. Click en "Add workflow"
3. Nombra el workflow: **"Hola Mundo"**
4. Agrega estos nodos:

**Paso 1: Webhook**
- Tipo: `Webhook`
- HTTP Method: `POST`
- Path: `hola-mundo`

**Paso 2: Set**
- Campo: `message`
- Valor: `¡Hola desde n8n! La integración funciona.`

**Paso 3: Respond to Webhook**
- Response Code: `200`
- Response Body: `{{ $json.message }}`

5. Click **"Save"**
6. Click **"Activate"** (toggle en la esquina superior derecha)

### Probar desde Claude Code:

Una vez creado, di:
```
"Ejecuta el workflow 'Hola Mundo'"
```

O:
```
"Lista mis workflows"
```

---

## 📊 Workflow #2: "Deploy Status Checker"

**Propósito:** Simular un workflow de deploy que devuelve el estado.

### Cómo Crearlo:

**Nodos:**

1. **Webhook**
   - Path: `deploy-status`

2. **Code** (ejecuta JavaScript)
   ```javascript
   return [
     {
       json: {
         status: "success",
         environment: "production",
         timestamp: new Date().toISOString(),
         message: "Deploy completed successfully"
       }
     }
   ];
   ```

3. **Respond to Webhook**
   - Response: `{{ $json }}`

### Uso desde Claude Code:

```
"Ejecuta el workflow 'Deploy Status Checker'"
"Muéstrame el estado del último deploy"
```

---

## 🔄 Workflow #3: "Content Publisher"

**Propósito:** Simular publicación de contenido (para content-ops-starter).

### Nodos:

1. **Webhook**
   - Path: `publish-content`
   - Recibe: `{ "title": "...", "content": "..." }`

2. **Code**
   ```javascript
   const { title, content } = $input.all()[0].json;

   return [
     {
       json: {
         status: "published",
         title: title,
         url: `https://tu-sitio.com/posts/${title.toLowerCase().replace(/ /g, '-')}`,
         publishedAt: new Date().toISOString()
       }
     }
   ];
   ```

3. **Respond to Webhook**

### Uso Integrado:

```
Tú: "Genera un artículo sobre Next.js 15"
Claude: [Crea el markdown]

Tú: "Publica este artículo usando n8n"
Claude: [Ejecuta el workflow con los datos del artículo]
```

---

## 🔔 Workflow #4: "Slack Notifier" (Si tienes Slack)

**Propósito:** Enviar notificaciones cuando ocurren eventos.

### Nodos:

1. **Webhook**
   - Path: `notify-slack`

2. **Slack** (necesitas conectar tu workspace)
   - Action: Send Message
   - Channel: `#general`
   - Message: `{{ $json.message }}`

3. **Respond to Webhook**

### Uso:

```
"Notifica al equipo que el deploy terminó"
[n8n envía mensaje a Slack automáticamente]
```

---

## 🗄️ Workflow #5: "Sync Products" (Para e-commerce)

**Propósito:** Sincronizar productos desde Shopify/WooCommerce.

### Nodos:

1. **Schedule Trigger** (cron: cada hora)

2. **HTTP Request**
   - URL: `https://api.shopify.com/products`
   - Method: GET

3. **Code** (procesar productos)
   ```javascript
   const products = $input.all()[0].json.products;

   return products.map(product => ({
     json: {
       id: product.id,
       title: product.title,
       price: product.price,
       // Claude Code puede optimizar la descripción aquí
       description: product.description
     }
   }));
   ```

4. **HTTP Request** (guardar en tu CMS)
   - URL: `https://tu-api.com/products`
   - Method: POST

### Uso Avanzado:

```
Tú: "Sincroniza los productos de Shopify"
Claude: [Ejecuta workflow]
        "Se sincronizaron 25 productos nuevos.
         ¿Quieres que optimice las descripciones para SEO?"
```

---

## 🧪 Workflow #6: "Test Runner"

**Propósito:** Ejecutar tests de tu proyecto.

### Nodos:

1. **Webhook**
   - Path: `run-tests`

2. **Execute Command** (si tienes n8n self-hosted)
   - Command: `cd /path/to/project && npm test`

3. **IF** (condicional)
   - Si tests pasan → Nodo 4
   - Si fallan → Nodo 5

4. **Respond** (success)
   ```json
   {
     "status": "passed",
     "message": "All tests passed ✅"
   }
   ```

5. **Respond** (failure)
   ```json
   {
     "status": "failed",
     "message": "Tests failed ❌"
   }
   ```

### Uso:

```
"Ejecuta los tests del proyecto"
[n8n ejecuta npm test y devuelve resultado]
```

---

## 📅 Workflow #7: "Weekly Report Generator"

**Propósito:** Generar reportes automáticos.

### Nodos:

1. **Schedule Trigger** (Viernes 5pm)

2. **HTTP Request** (obtener métricas)
   - URL: Google Analytics API / tu API

3. **Code** (formatear datos)
   ```javascript
   const metrics = $input.all()[0].json;

   return [{
     json: {
       week: "Semana del " + new Date().toISOString().split('T')[0],
       pageViews: metrics.pageViews,
       uniqueVisitors: metrics.visitors,
       topPages: metrics.topPages
     }
   }];
   ```

4. **Email** (enviar reporte)
   - To: `equipo@tuempresa.com`
   - Subject: `Reporte Semanal`
   - Body: Template con los datos

### Claude Code puede:

```
"Genera un análisis del reporte semanal"
[Analiza los datos y sugiere mejoras]
```

---

## 🚀 Cómo Usar Estos Workflows

### Desde Claude Code:

**Listar:**
```
"Muéstrame todos mis workflows"
"Lista los workflows activos"
```

**Ejecutar:**
```
"Ejecuta el workflow Hola Mundo"
"Ejecuta Deploy Status Checker"
```

**Ver Estado:**
```
"Muéstrame las últimas ejecuciones"
"¿Cuál es el estado del workflow X?"
```

**Gestionar:**
```
"Activa el workflow de sync"
"Desactiva las notificaciones"
```

---

## 💡 Tips

1. **Empieza simple:** Crea "Hola Mundo" primero
2. **Prueba la ejecución:** Ejecuta desde Claude Code
3. **Incrementa complejidad:** Agrega lógica paso a paso
4. **Combina con Claude:** Usa workflows que Claude Code puede alimentar con datos

---

## 🔗 Recursos

- **[QUICK_START.md](./QUICK_START.md)** - Guía de inicio
- **[WORKFLOWS.md](./WORKFLOWS.md)** - Casos de uso avanzados
- **[n8n Docs](https://docs.n8n.io)** - Documentación oficial

---

## ✨ Siguiente Paso

1. **Crea el workflow "Hola Mundo"** en tu n8n
2. **Actívalo**
3. **Desde Claude Code, di:** `"Lista mis workflows de n8n"`
4. **Ejecuta:** `"Ejecuta el workflow Hola Mundo"`

¡A automatizar! 🚀
