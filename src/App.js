import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import Detection from './components/pages/Detection';
import ChatBot from './components/pages/ChatBot'; // ✅ Add chatbot import
import About from './components/pages/About';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detection" element={<Detection />} />
              <Route path="/chatbot" element={<ChatBot />} /> {/* ✅ Add chatbot route */}
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
