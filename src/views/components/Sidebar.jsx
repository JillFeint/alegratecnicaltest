import React from 'react';

export default function Sidebar({ isOpen, onClose, isMobile }) {
  return (
    <>
      {/* El overlay SOLO se dibuja si estamos en versión móvil y el menú está abierto */}
      {isMobile && isOpen && (
        <div style={styles.overlay} onClick={onClose} />
      )}

      <aside
        style={{
          ...styles.sidebar,
          transform: isMobile
            ? isOpen
              ? 'translateX(0)'
              : 'translateX(-100%)'
            : isOpen
            ? 'translateX(0)'
            : 'translateX(-100%)',
          position: isMobile ? 'fixed' : 'sticky',
          top: '56px',
          height: 'calc(100vh - 56px)',
        }}
      >
        {/* Módulo Naranja de Sesión Activa (Posicionado ESTRICTAMENTE ARRIBA de Inicio) */}
        <div style={styles.statusModule}>
          <div style={styles.statusModuleTitle}>Sesión Activa</div>
          <div style={styles.statusDetail}>Estado: En línea</div>
          <div style={styles.statusDetail}>Terminal: POS Colombia</div>
        </div>

        <nav style={styles.navGroup}>
          <div style={styles.navItem}>Volver a Espacio Contador</div>
          <div style={styles.navItem}>Inicio</div>
          <div style={styles.navItem}>Bandeja de entrada</div>
          <div style={styles.navItem}>Habilitar factura electrónica</div>
          <div style={{ ...styles.navItem, ...styles.navItemActive }}>
            Facturas de compra / Feedback
          </div>
          <div style={styles.navItem}>Contactos</div>
          <div style={styles.navItem}>Inventario</div>
          <div style={styles.navItem}>Bancos</div>
        </nav>
      </aside>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: '56px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 150,
  },
  sidebar: {
    width: '240px',
    minWidth: '240px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E2E8F0',
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 200,
    transition: 'transform 0.25s ease-in-out',
    overflowY: 'auto',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  statusModule: {
    backgroundColor: '#FF6D00',
    color: '#FFFFFF',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '12px',
    lineHeight: '1.4',
    boxShadow: '0 2px 4px rgba(255, 109, 0, 0.25)',
    marginBottom: '16px',
  },
  statusModuleTitle: {
    fontWeight: '700',
    fontSize: '11px',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statusDetail: {
    fontSize: '12px',
    opacity: 0.95,
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: {
    padding: '10px 12px',
    borderRadius: '6px',
    color: '#4A5568',
    fontSize: '13px',
    fontWeight: '400',
    cursor: 'pointer',
    lineHeight: '1.3',
  },
  navItemActive: {
    backgroundColor: '#E6F7F5',
    color: '#00BFA5',
    fontWeight: '600',
  },
};