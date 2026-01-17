import React from 'react';
import { motion } from 'framer-motion';

const RICE_DISEASES = [
  {
    name: 'Rice Blast',
    symptoms: 'Diamond-shaped lesions with gray centers and brown margins on leaves.',
    treatments: [
      'Apply Tricyclazole fungicide (0.6g/L)',
      'Use resistant varieties like Pusa 6A',
      'Maintain proper water management'
    ]
  },
  {
    name: 'Bacterial Leaf Blight',
    symptoms: 'Water-soaked lesions along leaf margins that turn yellow then brown.',
    treatments: [
      'Apply Copper oxychloride (3g/L)',
      'Remove infected plant debris',
      'Improve field drainage'
    ]
  }
];

const DetectionResults = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <motion.div
        className="detection-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="loading-spinner" />
        <h3>Analyzing Your Image</h3>
        <p>Our AI is examining the rice leaf for disease indicators...</p>
      </motion.div>
    );
  }

  if (!result) {
    return null;
  }

  const diseaseInfo = RICE_DISEASES.find(d => d.name === result.disease);
  const confidenceColor = result.confidence >= 0.8 ? '#4CAF50' : 
                         result.confidence >= 0.6 ? '#FF9800' : '#F44336';

  return (
    <motion.div
      className="detection-results"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header">
        <motion.div
          className="confidence-ring"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg className="confidence-svg" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={confidenceColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${result.confidence * 314} 314`}
              initial={{ strokeDasharray: "0 314" }}
              animate={{ strokeDasharray: `${result.confidence * 314} 314` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
          <div className="confidence-text">
            <span className="confidence-percentage">
              {Math.round(result.confidence * 100)}%
            </span>
            <span className="confidence-label">Confidence</span>
          </div>
        </motion.div>

        <div className="result-summary">
          <motion.h2
            className={`disease-name ${result.status === 'healthy' ? 'healthy' : 'diseased'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {result.status === 'healthy' ? '✅ Healthy Plant' : `🦠 ${result.disease}`}
          </motion.h2>
          
          <motion.p
            className="result-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {result.message}
          </motion.p>
        </div>
      </div>

      {result.status === 'diseased' && diseaseInfo && (
        <motion.div
          className="disease-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="detail-card">
            <h4>📋 Symptoms</h4>
            <p>{diseaseInfo.symptoms}</p>
          </div>

          <div className="detail-card">
            <h4>🎯 Treatment</h4>
            <ul>
              {diseaseInfo.treatments.map((treatment, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {treatment}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetectionResults;
