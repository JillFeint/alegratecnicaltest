/**
 * Componente de Vista puramente declarativo.
 * Se encarga exclusivamente de renderizar la interfaz y recibir eventos del usuario,
 * delegando la lógica de negocio y estado al controlador.
 */

import React from 'react';
import { useFeedbackController } from '../../controllers/useFeedbackController';
import { ALLOWED_PRODUCTS, INPUT_LIMITS } from '../../config/env.config';

export default function FeedbackForm() {
  const {
    formData,
    errors,
    touched,
    loading,
    statusMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFeedbackController();

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Módulo de Feedback</h2>
      <p style={styles.subtitle}>
        Envía tus comentarios o sugerencias para mejorar la plataforma.
      </p>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        {/* Campo Usuario */}
        <div style={styles.fieldGroup}>
          <div style={styles.labelRow}>
            <label style={styles.label}>Usuario</label>
            <span
              style={{
                ...styles.charCounter,
                color:
                  formData.user.length >= INPUT_LIMITS.MAX_USER_LENGTH
                    ? '#DD6B20'
                    : '#718096',
              }}
            >
              {formData.user.length} / {INPUT_LIMITS.MAX_USER_LENGTH}
            </span>
          </div>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              borderColor: errors.user && touched.user ? '#E53E3E' : '#CBD5E0',
            }}
            disabled={loading}
          />
          {errors.user && touched.user && (
            <span style={styles.errorText}>{errors.user}</span>
          )}
        </div>

        {/* Campo Producto */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Producto / Módulo</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.select,
              borderColor:
                errors.product && touched.product ? '#E53E3E' : '#CBD5E0',
            }}
            disabled={loading}
          >
            {ALLOWED_PRODUCTS.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
          {errors.product && touched.product && (
            <span style={styles.errorText}>{errors.product}</span>
          )}
        </div>

        {/* Campo Comentario */}
        <div style={styles.fieldGroup}>
          <div style={styles.labelRow}>
            <label style={styles.label}>Comentario</label>
            <span
              style={{
                ...styles.charCounter,
                color:
                  formData.comment.length >= INPUT_LIMITS.MAX_COMMENT_LENGTH
                    ? '#E53E3E'
                    : '#718096',
              }}
            >
              {formData.comment.length} / {INPUT_LIMITS.MAX_COMMENT_LENGTH}
            </span>
          </div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe tus observaciones aquí (mínimo 10 caracteres)..."
            rows={4}
            style={{
              ...styles.textarea,
              borderColor:
                errors.comment && touched.comment ? '#E53E3E' : '#CBD5E0',
            }}
            disabled={loading}
          />
          {errors.comment && touched.comment && (
            <span style={styles.errorText}>{errors.comment}</span>
          )}
        </div>

        {/* Panel de Estado Inferior */}
        {statusMessage && (
          <div
            style={{
              ...styles.statusBox,
              backgroundColor:
                statusMessage.type === 'error'
                  ? '#FFF5F5'
                  : statusMessage.type === 'warning'
                  ? '#FFFAF0'
                  : '#F0FFF4',
              color:
                statusMessage.type === 'error'
                  ? '#C53030'
                  : statusMessage.type === 'warning'
                  ? '#DD6B20'
                  : '#2F855A',
              borderColor:
                statusMessage.type === 'error'
                  ? '#FEB2B2'
                  : statusMessage.type === 'warning'
                  ? '#FBD38D'
                  : '#9AE6B4',
            }}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Procesando...' : 'Enviar Feedback'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    padding: '24px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A5568',
  },
  charCounter: {
    fontSize: '12px',
    fontWeight: '500',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #CBD5E0',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s ease',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #CBD5E0',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #CBD5E0',
    fontSize: '14px',
    resize: 'vertical', // Permite expandir solo verticalmente
    minHeight: '100px', // Altura mínima fija inicial
    maxHeight: '220px', // Limite máximo para evitar deformar el diseño
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: '12px',
    fontWeight: '500',
    marginTop: '2px',
  },
  statusBox: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid',
    fontSize: '13px',
    marginTop: '6px',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#00BFA5',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px',
    marginTop: '8px',
    width: '100%',
    transition: 'opacity 0.2s ease',
  },
};
