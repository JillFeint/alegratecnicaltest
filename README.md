# 🚀 Alegra Feedback IA

Aplicación web desarrollada en **React** para la gestión y procesamiento inteligente de comentarios y retroalimentación, conectada a un backend automatizado en **Google Apps Script** potenciado con Inteligencia Artificial (Gemini).

---

## 🛠️ Arquitectura del Proyecto

* **Frontend:** Desarrollado en **React (Vite)**, optimizado para ofrecer una interfaz rápida, limpia y responsiva. Alojado y desplegado de forma continua en **Vercel**.
* **Backend / API:** Gestionado mediante **Google Apps Script**, actuando como un middleware ligero que procesa las solicitudes de los usuarios.
* **Procesamiento e IA:** Integración automatizada con modelos de lenguaje para analizar el sentimiento, categorizar y estructurar la retroalimentación de manera eficiente.
* **Almacenamiento:** Registro centralizado en **Google Sheets** con un sistema de reintentos y control de límites (`exponential backoff`) para garantizar la estabilidad.

---

## ⚙️ Características Principales

* 📊 Envío de comentarios en tiempo real desde la interfaz web.
* 🤖 Procesamiento inteligente de datos mediante IA.
* 🔄 Manejo robusto de errores y reintentos automáticos de API.
* 🚀 Pipeline de CI/CD automatizado con despliegue instantáneo en Vercel.

---

## 🚀 Despliegue y Configuración Local

Si deseas clonar y levantar el proyecto en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)