/**
 * src/controllers/useFeedbackController.js
 * Custom Hook que actúa como el Controlador en la arquitectura MVC del cliente.
 * Orquesta estados, reglas de validación y la comunicación con la capa de servicio.
 */

 import { useState } from 'react';
 import { FeedbackModel } from '../models/feedback.model';
 import { FeedbackService } from '../services/feedback.service';
 import { ALLOWED_PRODUCTS, INPUT_LIMITS } from '../config/env.config';
 
 export function useFeedbackController() {
   const [formData, setFormData] = useState({
     user: 'Dora',
     product: ALLOWED_PRODUCTS[0],
     comment: '',
   });
 
   const [errors, setErrors] = useState({});
   const [touched, setTouched] = useState({});
   const [loading, setLoading] = useState(false);
   const [statusMessage, setStatusMessage] = useState(null);
 
   /**
    * Maneja el cambio dinámico de los inputs y limpia errores si el campo ya fue tocado.
    */
   const handleChange = (e) => {
     const { name, value } = e.target;
 
     if (name === 'comment' && value.length > INPUT_LIMITS.MAX_COMMENT_LENGTH) return;
     if (name === 'user' && value.length > INPUT_LIMITS.MAX_USER_LENGTH) return;
 
     setFormData((prev) => ({ ...prev, [name]: value }));
 
     if (touched[name]) {
       const fieldErrors = FeedbackModel.validate({ ...formData, [name]: value });
       setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
     }
   };
 
   /**
    * Marca el campo como interactuado (blur) y valida en tiempo real.
    */
   const handleBlur = (e) => {
     const { name, value } = e.target;
     setTouched((prev) => ({ ...prev, [name]: true }));
     const fieldErrors = FeedbackModel.validate({ ...formData, [name]: value });
     setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
   };
 
   /**
    * Maneja la sumisión del formulario, orquestando modelo y servicio.
    */
   const handleSubmit = async (e) => {
     if (e) e.preventDefault();
     if (loading) return;
 
     // Marcar todos los campos como interactuados
     setTouched({ user: true, product: true, comment: true });
 
     // Validar usando el Modelo
     const validationErrors = FeedbackModel.validate(formData);
     setErrors(validationErrors);
 
     if (Object.keys(validationErrors).length > 0) {
       return;
     }
 
     setLoading(true);
     setStatusMessage(null);
 
     // Formatear payload seguro a través del Modelo
     const securePayload = FeedbackModel.createPayload(formData);
 
     try {
       // Si la URL aún no está en .env, manejamos simulación o llamada de red
       await FeedbackService.sendFeedback(securePayload);
 
       setStatusMessage({
         type: 'success',
         text: `¡Feedback enviado con éxito!`,
       });
 
       // Limpiar comentario tras envío exitoso
       setFormData((prev) => ({ ...prev, comment: '' }));
       setTouched({});
     } catch (error) {
       setStatusMessage({
         type: 'error',
         text: error.message || 'Error al procesar el envío del feedback.',
       });
     } finally {
       setLoading(false);
     }
   };
 
   return {
     formData,
     errors,
     touched,
     loading,
     statusMessage,
     handleChange,
     handleBlur,
     handleSubmit,
   };
 }