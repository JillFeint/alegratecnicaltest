/**
 * src/App.jsx
 * Contenedor principal de la aplicación.
 * Mantiene la disposición responsiva y el control de visibilidad del Sidebar,
 * renderizando los componentes de vista sin lógica directa de negocio.
 */

 import React, { useState, useEffect } from 'react';
 import TopBar from './views/components/TopBar';
 import Sidebar from './views/components/Sidebar';
 import FeedbackForm from './views/components/FeedbackForm';
 
 export default function App() {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
 
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
           <FeedbackForm />
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