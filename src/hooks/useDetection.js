import { useState } from 'react';
import { toast } from 'react-toastify';
import { analyzeImage } from '../services/api'; // Import the real API function

export const useDetection = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageData) => {
    setCurrentImage(imageData);
    setResult(null);
    toast.success('Image uploaded successfully!');
  };

  const analyzeCurrentImage = async () => {
    if (!currentImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Use the file property from currentImage for backend
      const analysisResult = await analyzeImage(currentImage.file);
      setResult(analysisResult);
      toast.success('Analysis completed!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDetection = () => {
    setCurrentImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return {
    currentImage,
    result,
    isAnalyzing,
    handleImageUpload,
    analyzeCurrentImage,
    resetDetection
  };
};