import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '../detection/ImageUploader';
import DetectionResults from '../detection/DetectionResults';
import { useDetection } from '../../hooks/useDetection';
import Button from '../common/Button';

const Detection = () => {
  const {
    currentImage,
    result,
    isAnalyzing,
    handleImageUpload,
    analyzeCurrentImage,
    resetDetection
  } = useDetection();

  // Ref for ImageUploader to trigger file input
  const uploaderRef = useRef();

  // Handler to reset and open uploader
  const handleAnalyzeNewImage = () => {
    resetDetection();
    setTimeout(() => {
      if (uploaderRef.current && uploaderRef.current.openFileDialog) {
        uploaderRef.current.openFileDialog();
      }
    }, 100);
  };

  return (
    <div className="detection-page-centered">
      <div className="detection-container">
        {/* Header Section */}
        <motion.div
          className="detection-header-centered"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>🌾Disease Detection</h1>
          <p>Upload a clear image of your rice leaf for instant AI-powered disease analysis</p>
        </motion.div>

        {/* Upload & Analysis Section */}
        <motion.div
          className="upload-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Show uploader if no result or after reset */}
           {(!result || isAnalyzing || currentImage) && (
    <ImageUploader
      ref={uploaderRef}
      onImageUpload={handleImageUpload}
      isAnalyzing={isAnalyzing}
      image={currentImage} // pass image for preview
    />
  )}

          {currentImage && !result && !isAnalyzing && (
            <motion.div
              className="analysis-button-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="large"
                onClick={analyzeCurrentImage}
                disabled={isAnalyzing}
                loading={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : '🔬 Analyze Image'}
              </Button>
            </motion.div>
          )}

          {/* After result, show only result and "Analyze New Image" */}
          {result && (
            <motion.div
              className="reset-button-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="secondary"
                onClick={handleAnalyzeNewImage}
              >
                🔄 Analyze New Image
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div
          className="results-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <DetectionResults
            result={result}
            isLoading={isAnalyzing}
          />
        </motion.div>

        {/* Enhanced Instructions Section */}
        <motion.div
          className="instructions-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="instructions-title">📋 How to Get Best Results</h3>
          
          <div className="instructions-grid">
            <motion.div
              className="instruction-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="instruction-icon-wrapper">
                <span className="instruction-icon">📷</span>
              </div>
              <div className="instruction-content">
                <h4>Clear Images</h4>
                <p>Take photos in good lighting conditions with minimal shadows</p>
              </div>
            </motion.div>

            <motion.div
              className="instruction-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="instruction-icon-wrapper">
                <span className="instruction-icon">🔍</span>
              </div>
              <div className="instruction-content">
                <h4>Close Focus</h4>
                <p>Capture the leaf filling most of the frame for detailed analysis</p>
              </div>
            </motion.div>

            <motion.div
              className="instruction-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="instruction-icon-wrapper">
                <span className="instruction-icon">🌿</span>
              </div>
              <div className="instruction-content">
                <h4>Single Leaf</h4>
                <p>Focus on one leaf for accurate diagnosis and clear results</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Detection;