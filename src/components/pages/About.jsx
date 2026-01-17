import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Rice AI</h1>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>
          Advanced machine learning solution for rice disease detection and agricultural support
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem',background: '#060337' }}>
        <h2 style={{ marginBottom: '1rem' }}>Project Overview</h2>
        <p style={{ lineHeight: '1.7', color: '#666' }}>
          Rice AI is an innovative agricultural technology platform that leverages artificial intelligence 
          and machine learning to help farmers identify and manage rice plant diseases. Our system provides 
          instant, accurate diagnosis with treatment recommendations, supporting sustainable farming practices 
          and improved crop yields.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem',background: '#060337' }}>
        <h2 style={{ marginBottom: '1rem' }}>Team Information</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '3rem' }}>👨‍💻</div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Ashish</h3>
            <p style={{ color: '#666' }}>Developer</p>
            <p style={{ color: '#666' }}>Student ID: 4MT22CS030</p>
            <p style={{ color: '#666' }}>Mangalore Institute of Technology and Engineering</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Akash</h3>
            <p style={{ color: '#666' }}>Developer</p>
            <p style={{ color: '#666' }}>Student ID: 4MT22CS012</p>
            <p style={{ color: '#666' }}>Mangalore Institute of Technology and Engineering</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Afhaam</h3>
            <p style={{ color: '#666' }}>Developer</p>
            <p style={{ color: '#666' }}>Student ID: 4MT22CS008</p>
            <p style={{ color: '#666' }}>Mangalore Institute of Technology and Engineering</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Akshay</h3>
            <p style={{ color: '#666' }}>Lead Developer</p>
            <p style={{ color: '#666' }}>Student ID: 4MT22CS014</p>
            <p style={{ color: '#666' }}>Mangalore Institute of Technology and Engineering</p>
          </div>
        </div>
      </div>

      <div className="card" style={{background: '#060337'}}>
        <h2 style={{ marginBottom: '1rem' }}>Key Features</h2>
        <ul style={{ lineHeight: '1.8', color: '#666' }}>
          <li>🔬 AI Disease Detection - Advanced CNN models for accurate identification</li>
          <li>📱 Mobile Responsive - Optimized for field use on mobile devices</li>
          <li>⚡ Real-time Analysis - Instant results with treatment recommendations</li>
          <li>🛡️ Prevention Tips - Comprehensive disease prevention strategies</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
