import React from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import DetectionResults from './DetectionResults';
import { useDetection } from '../../hooks/useDetection';
import Card from '../common/Card';
import Button from '../common/Button';

const DetectionSystem = () => {
  const {
    currentImage,
    result,
    isAnalyzing,
    handleImageUpload,
    analyzeCurrentImage,
    resetDetection
  } = useDetection();

  return (
    <div className="detection-system">
      <motion.div
        className="detection-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Upload Section */}
        <motion.div
          className="upload-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card title="Upload Rice Leaf Image" className="upload-card">
            <ImageUploader
              onImageUpload={handleImageUpload}
              isAnalyzing={isAnalyzing}
            />
            
            {currentImage && !result && !isAnalyzing && (
              <motion.div
                className="analyze-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="primary"
                  size="large"
                  onClick={analyzeCurrentImage}
                  className="analyze-btn"
                >
                  🔬 Analyze for Diseases
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          className="results-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {(result || isAnalyzing) && (
            <Card title="Analysis Results" className="results-card">
              <DetectionResults
                result={result}
                isLoading={isAnalyzing}
              />
              
              {result && (
                <motion.div
                  className="action-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    variant="secondary"
                    onClick={resetDetection}
                  >
                    🔄 Analyze New Image
                  </Button>
                </motion.div>
              )}
            </Card>
          )}
          
          {!result && !isAnalyzing && !currentImage && (
            <Card className="placeholder-card glass-card">
              <div className="placeholder-content">
                <div className="placeholder-icon">📊</div>
                <h3>Results will appear here</h3>
                <p>Upload an image to start the disease analysis process</p>
              </div>
            </Card>
          )}
        </motion.div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="instructions-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card title="How to Use" className="instructions-card">
          <div className="instructions-grid">
            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Upload Image</h4>
                <p>Take a clear photo of the rice leaf or upload from your device</p>
              </div>
            </div>
            
            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>AI Analysis</h4>
                <p>Our machine learning model analyzes the image for disease symptoms</p>
              </div>
            </div>
            
            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Get Results</h4>
                <p>Receive detailed diagnosis with treatment recommendations</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DetectionSystem;
