import React from 'react';

export default function TopBar({ onToggleMenu }) {
  return (
    <header style={styles.topbar}>
      <div style={styles.leftSection}>
        <button style={styles.menuButton} onClick={onToggleMenu} aria-label="Abrir Menú">
          ☰
        </button>
        <span style={styles.brand}>alegra</span>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchBox}
          placeholder="Buscar..."
          readOnly
        />
      </div>

      <div style={styles.userProfile}>
        <div style={styles.avatar}>D</div>
        <span style={styles.userName}>Dora</span>
      </div>
    </header>
  );
}

const styles = {
  topbar: {
    height: '56px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#2D3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  brand: {
    fontWeight: '700',
    color: '#00BFA5',
    fontSize: '20px',
    letterSpacing: '-0.5px',
  },
  searchContainer: {
    flex: '1',
    maxWidth: '320px',
    margin: '0 16px',
  },
  searchBox: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    border: '1px solid #CBD5E0',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2D3748',
  },
  avatar: {
    width: '32px',
    height: '32px',
    backgroundColor: '#00BFA5',
    color: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};