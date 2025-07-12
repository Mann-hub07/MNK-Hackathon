import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/Common/ErrorBoundary";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import HelpDesk from "./pages/HelpDesk";

// Tidio Chat Integration
const TidioChat = () => {
  useEffect(() => {
    // Get Tidio key from environment variable or use a default for development
    const tidioKey = process.env.REACT_APP_TIDIO_KEY || 'demo-key';
    
    // Check if script already exists to prevent duplicates
    const existingScript = document.querySelector('script[src*="tidio"]');
    if (existingScript) {
      return;
    }

    // Tidio Chat Widget Integration
    const script = document.createElement('script');
    script.src = `//code.tidio.co/${tidioKey}.js`;
    script.async = true;
    script.id = 'tidio-script';
    
    const handleLoad = () => {
      console.log('Tidio chat loaded successfully');
    };
    
    const handleError = () => {
      console.warn('Failed to load Tidio chat widget');
    };
    
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    
    document.body.appendChild(script);

    // Cleanup
    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      
      // Remove the script tag
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Clean up any Tidio global objects
      if (window.tidioChatApi) {
        try {
          window.tidioChatApi.close();
        } catch (e) {
          console.warn('Error closing Tidio chat:', e);
        }
      }
    };
  }, []);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Landing />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/login" element={<Login />} />
            
            <Route path="/about" element={
              <>
                <Navbar />
                <AboutUs />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/help" element={
              <>
                <Navbar />
                <HelpDesk />
                <Footer />
                <TidioChat />
              </>
            } />
            
            {/* Protected Routes with Layout */}
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <Dashboard />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/browse" element={
              <>
                <Navbar />
                <Browse />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/add-item" element={
              <>
                <Navbar />
                <AddItem />
                <Footer />
                <TidioChat />
              </>
            } />
            
            <Route path="/item/:id" element={
              <>
                <Navbar />
                <ItemDetail />
                <Footer />
                <TidioChat />
              </>
            } />
            
            {/* Admin Route */}
            <Route path="/admin" element={
              <>
                <Navbar />
                <Admin />
                <Footer />
                <TidioChat />
              </>
            } />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={
              <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                    <p className="text-xl text-gray-600 mb-8">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
                      Go Home
                    </a>
                  </div>
                </div>
                <Footer />
              </>
            } />
          </Routes>
          
          {/* Global Toast Notifications */}
          <Toaster />
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;