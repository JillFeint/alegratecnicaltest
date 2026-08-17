# 🚀 Alegra Feedback IA: Documentación Técnica

Aplicación web desarrollada en React para la gestión y procesamiento de comentarios y retroalimentación, estructurada bajo un patrón MVC (Model-View-Controller) en el frontend, y conectada a un backend robusto en Google Apps Script diseñado bajo Arquitectura Hexagonal.

---

## 🛠️ Arquitectura del Sistema y Patrones de Diseño

*   **Frontend (React / Vite - MVC):** Organizado bajo el patrón Modelo-Vista-Controlador para separar la lógica de negocio de la interfaz de usuario, optimizado para ofrecer una experiencia rápida y responsiva. Alojado y desplegado de forma continua en Vercel.
*   **Backend (Google Apps Script - Arquitectura Hexagonal):** Implementado con separación estricta de responsabilidades mediante Adaptadores y Puertos (Core de Dominio, Adaptadores de Google Sheets y Adaptadores de la API de Gemini) para garantizar mantenibilidad, desacoplamiento y escalabilidad.
*   **Procesamiento e IA (Batch Asíncrono):** Integración con la API de Gemini mediante un disparador automático (Trigger) programado cada 1 hora. Los comentarios enviados desde el frontend se almacenan inicialmente como `PENDIENTE` en Google Sheets, y el procesador por lotes los remite a la IA de forma asíncrona para su clasificación de sentimiento y resumen sin saturar la latencia del usuario.
*   **Almacenamiento y Seguridad:** Registro centralizado en Google Sheets con un sistema de reintentos y control de límites (exponential backoff). Incorpora sanitización activa contra ataques XSS e inyecciones de código en el cliente.

---

## 📊 Dashboard Interactivo para Stakeholders (Looker Studio)

El flujo de datos culmina en un tablero de inteligencia de negocios en Looker Studio, conectado directamente a la base de datos de Google Sheets:

*   **Filtros Dinámicos:** Configurados por rango de fechas, categoría de sentimiento y productos oficiales (Alegra POS, Alegra Contabilidad, Alegra Nómina).
*   **Métrica Clave de Satisfacción:** Incorpora un campo calculado para medir el puntaje de impacto y NPS basado en los sentimientos procesados:

$$ \text{Score de Sentimiento} = \frac{\text{Comentarios Positivos} - \text{Comentarios Negativos}}{\text{Total Comentarios}} \times 100 $$

*   **Visualización Gerencial:** Gráficos de volumen, impacto del feedback por módulo y semaforización condicional orientada a la toma de decisiones de los stakeholders.

---

## 🔗 Enlaces de Despliegue y Recursos

* **Frontend (React - Vercel):** [alegratecnicaltest – Deployments – Vercel](https://alegratecnicaltest.vercel.app/)
* **Repositorio de Código (GitHub):** [github.com/JillFeint/alegratecnicaltest](https://github.com/JillFeint/alegratecnicaltest)
* **Editor Backend (Google Apps Script):** [Editor de Apps Script](https://script.google.com/d/1O6tLJ6LqNuf5pizjH1D2i29d-cpHCpnXacStTBjQv6LiihMFnBOADYCr/edit?usp=sharing)
* **Base de Datos (Google Sheets):** [Feedback Alegra Sheet](https://docs.google.com/spreadsheets/d/1zh8UgP5yeoVJlmSQrK3TtcsPZ841SDyHPq-RHSphJXQ/edit?usp=sharing)

---

## 📊 Estructura de la Base de Datos (Google Sheets - Pestaña "Feedbacks")

| Columna | Campo | Descripción / Origen |
| :--- | :--- | :--- |
| A | ID | Identificador único (UUID v4) |
| B | Fecha | Marca de tiempo ISO del registro |
| C | Producto | Módulo seleccionado (Alegra POS, Alegra Contabilidad, Alegra Nómina) |
| D | Comentario | Texto ingresado por el usuario |
| E | Usuario | Nombre de usuario (opcional o por defecto) |
| F | Sentimiento | Categoría analizada por IA (Positivo, Neutro, Negativo) |
| G | Resumen IA | Síntesis breve del comentario generada por IA |
| H | Estado | Control de procesamiento (PENDIENTE / PROCESADO) |

---

## 🚀 Despliegue y Configuración en Vercel (Vite + React)

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/JillFeint/alegratecnicaltest.git
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Prueba local:**
    ```bash
    npm run dev
    ```
4.  **Despliegue en Vercel:** Importa tu repositorio `alegratecnicaltest` desde GitHub. Vercel detectará el proyecto de Vite + React automáticamente (`npm run build`) para su despliegue continuo.

---

## ⚙️ Configuración e Importación del Backend en Google Apps Script

Para integrar correctamente el código modular bajo Arquitectura Hexagonal en Google Apps Script, sigue estos pasos:

1.  Abre tu Google Sheets asignado y accede a **Extensiones > Apps Script**.
2.  Importa y crea los archivos fuente correspondientes copiando y pegando el código limpio en cada módulo:
    *   `Configuracion.gs`: Manejo de constantes globales y ID de la hoja de Google Sheets.
    *   `Domain_Feedback.gs`: Lógica de negocio y validación de entidades de feedback.
    *   `Port_FeedbackRepository.gs`: Contrato/puerto de persistencia.
    *   `Adapter_GoogleSheets.gs`: Adaptador de salida para la persistencia de filas en Google Sheets.
    *   `Controller_Web.gs`: Puntos de entrada HTTP (`doPost` y `doGet`) para recibir las solicitudes desde la interfaz de React.
    *   `Domain_Gemini.gs`, `Port_GeminiService.gs`, `Adapter_GeminiApi.gs`: Subsistema hexagonal para la conexión segura con la API de Gemini.
    *   `Orchestrator_IA.gs`: Lógica del proceso por lotes (`BatchFeedbackProcessor`) conectado al trigger de ejecución periódica.
3.  **Configura tu clave de API en las Propiedades del Script:**
    *   Ve a la rueda dentada de **Configuración del proyecto**.
    *   Agrega una propiedad de secuencia de comandos con la clave `GEMINI_API_KEY` y tu llave secreta de Gemini.
4.  **Publica el proyecto como Aplicación Web:**
    *   Haz clic en **Implementar > Nueva implementación**.
    *   Selecciona el tipo **Aplicación web**.
    *   Define el acceso como **Cualquiera** para autorizar las inserciones web seguras desde la interfaz de React.
