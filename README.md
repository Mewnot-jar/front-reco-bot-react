# 📝 Recordatorios Dashboard (Frontend)

![Estado: En Desarrollo](https://img.shields.io/badge/Estado-En%20Desarrollo-orange)

Interfaz de usuario moderna y responsiva para la gestión de tareas y evaluaciones académicas. Este panel se comunica de forma segura con la API de RecordBOT para operaciones CRUD en tiempo real.

## 🚀 Características Principales

* **Gestión en Tiempo Real:** Creación y eliminación dinámica de tareas reflejadas instantáneamente en la base de datos.
* **Diseño Responsivo (Mobile-First):** Interfaz fluida que se adapta automáticamente a smartphones, tablets y monitores de escritorio.
* **Experiencia de Usuario (UX):** Implementación de *Skeleton Screens* para transiciones de carga suaves y notificaciones Toast para confirmar acciones al usuario.
* **Seguridad:** Conexión estricta mediante CORS y variables de entorno.

## 🛠️ Tecnologías Utilizadas

* **React (Vite):** Framework principal para un renderizado y compilación ultrarrápidos.
* **Chakra UI:** Biblioteca de componentes accesibles y diseño modular.
* **JavaScript (ES6+)**

## ⚙️ Configuración Local

1. Clona el repositorio.
2. Instala las dependencias necesarias:
   \`\`\`bash
   npm install
   \`\`\`
3. Crea un archivo `.env` o `.env.local` en la raíz del proyecto para conectar con tu API:
   \`\`\`env
   VITE_API_URL=http://localhost:8000 # O la URL de tu API en producción
   \`\`\`
4. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🌐 Despliegue
Este proyecto está optimizado para ser alojado en plataformas para sitios estáticos como **Vercel**. 
* **Nota importante para Vercel:** Asegúrate de configurar la variable de entorno `VITE_API_URL` en el panel de configuración del proyecto antes de realizar el despliegue.
