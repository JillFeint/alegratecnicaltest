/**
 * src/App.jsx
 * Contenedor principal de la aplicación.
 * Mantiene la disposición responsiva y el control de visibilidad del Sidebar,
 * renderizando los componentes de vista con la lógica de envío al backend.
 */

import React, { useState, useEffect } from 'react';
import TopBar from './views/components/TopBar';
import Sidebar from './views/components/Sidebar';
import FeedbackForm from './views/components/FeedbackForm';

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [loading, setLoading] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleFeedbackSubmit = async (securePayload) => {
    setLoading(true);
    setFeedbackStatus(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("URL no configurada");
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(securePayload),
      });

      setFeedbackStatus({
        type: 'success',
        text: '¡Feedback enviado correctamente al servidor!'
      });
    } catch (error) {
      console.error("Error al enviar:", error);
      setFeedbackStatus({
        type: 'error',
        text: 'Hubo un error al conectar con el servidor.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      <TopBar onToggleMenu={toggleSidebar} />
      <div style={styles.mainLayout}>
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          style={{
            ...styles.content,
            marginLeft: !isMobile && !isSidebarOpen ? '-240px' : '0px',
          }}
        >
          <FeedbackForm 
            onSubmit={handleFeedbackSubmit}
            loading={loading}
            statusMessage={feedbackStatus}
          />
        </main>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    overflowX: 'hidden',
  },
  content: {
    flex: 1,
    padding: '24px 16px',
    backgroundColor: '#F4F6F8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    transition: 'margin-left 0.25s ease-in-out',
    width: '100%',
  },
};