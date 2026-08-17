/**
 * Capa de abstracción de Red.
 * Encargada exclusivamente de realizar las llamadas HTTP/Fetch hacia el backend.
 */

import { ENV_CONFIG } from '../config/env.config';

export class FeedbackService {
  /**
   * Envía la información del feedback al Web App de Google Apps Script.
   * @param {Object} payload Objeto de feedback validado y sanitizado.
   * @returns {Promise<Object>} Respuesta estructurada del servidor.
   */
  static async sendFeedback(payload) {
    if (!ENV_CONFIG.API_URL) {
      throw new Error('La URL del servidor no está configurada en env.config.js');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ENV_CONFIG.REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(ENV_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Compatibilidad recomendada para Apps Script CORS
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP Status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('La petición ha excedido el tiempo de espera permitido.');
      }

      throw new Error(error.message || 'Ocurrió un problema de conexión al enviar el feedback.');
    }
  }
}