/**
 * Centralización de variables de entorno y constantes de configuración del cliente.
 */

 export const ENV_CONFIG = {
  // Lectura segura de la variable de entorno desde .env (Vite)
  API_URL: import.meta.env?.VITE_APPS_SCRIPT_URL || '',
  
  // Timeout para peticiones de red (10 segundos)
  REQUEST_TIMEOUT_MS: 10000,

  // Metadatos de la aplicación
  APP_NAME: 'Alegra Feedback Module',
  VERSION: '1.0.0',
};

/**
 * Productos oficiales permitidos por la plataforma Alegra.
 */
export const ALLOWED_PRODUCTS = [
  'Alegra POS',
  'Alegra Contabilidad',
  'Alegra Nómina',
];

/**
 * Restricciones de longitud para los campos de entrada.
 */
export const INPUT_LIMITS = {
  MAX_USER_LENGTH: 30,
  MIN_COMMENT_LENGTH: 10,
  MAX_COMMENT_LENGTH: 500,
};