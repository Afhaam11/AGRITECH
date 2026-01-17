import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AI-Powered Rice Disease Detection</h1>
          <p className="hero-subtitle">
            Protect your rice crops with advanced machine learning technology. 
            Get instant disease diagnosis and treatment recommendations.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/detection')}
            >
              🔬 Start Detection
            </button>
            <button 
    className="btn btn-secondary btn-large"
    onClick={() => navigate('/chatbot')} // ✅ Link to chatbot
  >
    💬 Ask AI Assistant
  </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => navigate('/about')}
            >
              ℹ️ Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Farmers Helped</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6+</div>
            <div className="stat-label">Disease Types</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI Support</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Us?</h2>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>Advanced technology meets agricultural expertise</p>
        </div>

        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon">🔬</div>
            <h3 className="feature-title">AI Disease Detection</h3>
            <p className="feature-description">
              Advanced machine learning algorithms for accurate rice disease identification
            </p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Instant Analysis</h3>
            <p className="feature-description">
              Get results in seconds with our lightning-fast processing
            </p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Mobile Friendly</h3>
            <p className="feature-description">
              Perfect for field use with responsive mobile design
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
