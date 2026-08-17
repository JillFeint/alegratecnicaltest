/**
 * Modelo/Entidad de datos para la gestión de Feedback.
 * Encapsula la sanitización, validación y formateo de la información.
 */

 import { ALLOWED_PRODUCTS, INPUT_LIMITS } from '../config/env.config';

 export class FeedbackModel {
   /**
    * Sanitización activa contra XSS e inyección de código.
    * @param {string} str 
    * @returns {string}
    */
   static sanitizeInput(str) {
     if (typeof str !== 'string') return '';
     return str
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#x27;')
       .replace(/\//g, '&#x2F;')
       .replace(/javascript:/gi, '')
       .replace(/data:/gi, '')
       .replace(/on\w+=/gi, '');
   }
 
   /**
    * Valida los campos individuales de un formulario de feedback.
    * @param {Object} formData 
    * @returns {Object} Objeto con errores por campo.
    */
   static validate(formData) {
     const errors = {};
 
     // Validar Usuario
     if (formData.user && formData.user.trim().length > INPUT_LIMITS.MAX_USER_LENGTH) {
       errors.user = `El nombre no puede exceder ${INPUT_LIMITS.MAX_USER_LENGTH} caracteres.`;
     }
 
     // Validar Producto
     if (!ALLOWED_PRODUCTS.includes(formData.product)) {
       errors.product = 'Selecciona un producto válido de la lista.';
     }
 
     // Validar Comentario
     const commentTrimmed = formData.comment ? formData.comment.trim() : '';
     if (!commentTrimmed) {
       errors.comment = 'El comentario es obligatorio.';
     } else if (commentTrimmed.length < INPUT_LIMITS.MIN_COMMENT_LENGTH) {
       errors.comment = `El comentario debe tener al menos ${INPUT_LIMITS.MIN_COMMENT_LENGTH} caracteres.`;
     } else if (formData.comment.length > INPUT_LIMITS.MAX_COMMENT_LENGTH) {
       errors.comment = `El comentario no puede exceder ${INPUT_LIMITS.MAX_COMMENT_LENGTH} caracteres.`;
     }
 
     return errors;
   }
 
   /**
    * Construye un payload limpio y sanitizado listo para enviar al servidor.
    * @param {Object} rawData 
    * @returns {Object} Payload seguro.
    */
   static createPayload(rawData) {
     return {
       user: this.sanitizeInput(rawData.user?.trim()) || 'Anónimo',
       product: rawData.product?.trim() || ALLOWED_PRODUCTS[0],
       comment: this.sanitizeInput(rawData.comment?.trim()),
       timestamp: new Date().toISOString(),
     };
   }
 }