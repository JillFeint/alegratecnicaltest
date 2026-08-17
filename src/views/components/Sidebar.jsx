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
        {/* Módulo Naranja de Sesión Activa */}
        <div style={styles.statusModule}>
          <div style={styles.statusModuleTitle}>Sesión Activa</div>
          <div style={styles.statusDetail}>Estado: En línea</div>
          <div style={styles.statusDetail}>Terminal: Violeta sublime Colombia Sas</div>
        </div>

        <nav style={styles.navGroup}>
          <div style={styles.navItem}>Inicio</div>
          <div style={styles.navItem}>Dashboard</div>
          <div style={styles.navItem}>Bandeja de entrada</div>
          <div style={styles.navItem}>Habilitar factura electrónica</div>
          <div style={{ ...styles.navItem, ...styles.navItemActive }}>
            Envía tu feedback
          </div>
          <div style={styles.navItem}>Contactos</div>
          <div style={styles.navItem}>Inventario</div>
          <div style={styles.navItem}>Bancos</div>
        </nav>

        {/* Contenedor inferior con el botón de GitHub arriba y el Dashboard abajo */}
        <div style={styles.bottomContainer}>
          <a
            href="https://github.com/JillFeint/alegratecnicaltest/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.githubButton}
            title="En el readme.md en Enlaces de Despliegue y Recursos, encontrarás los entregables y toda la información necesaria para la revisión."
          >
            <svg 
              height="16" 
              width="16" 
              viewBox="0 0 16 16" 
              version="1.1" 
              aria-hidden="true" 
              style={{ fill: 'currentColor', flexShrink: 0 }}
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <span>Ver README en GitHub</span>
          </a>

          <a
            href="https://datastudio.google.com/reporting/05f5eee7-189f-4cce-9474-041111431af4"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.sidebarDashboardButton}
          >
            📊 VISITAR DASHBOARD
          </a>
        </div>
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
    flex: 1,
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
  bottomContainer: {
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  githubButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    backgroundColor: '#24292e',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '600',
    padding: '10px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(36, 41, 46, 0.2)',
    boxSizing: 'border-box',
    transition: 'background-color 0.2s ease',
  },
  sidebarDashboardButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#00BFA5',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '12px',
    padding: '12px',
    borderRadius: '6px',
    textDecoration: 'none',
    boxShadow: '0 4px 6px rgba(0, 191, 165, 0.25)',
    textAlign: 'center',
    boxSizing: 'border-box',
    transition: 'background-color 0.2s ease',
  },
};
