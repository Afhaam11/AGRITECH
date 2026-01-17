import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { deleteImage } from '../../services/api'; // Import delete API if needed

const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: 'Please upload a valid image file (JPEG, JPG, PNG, or WEBP)' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  return { isValid: true, error: null };
};

const ImageUploader = forwardRef(({ onImageUpload, isAnalyzing, image }, ref) => {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(image || null);
  const fileInputRef = useRef(null);

  // Expose openFileDialog to parent via ref
  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      fileInputRef.current && fileInputRef.current.click();
    }
  }));

  // Update preview if image prop changes (for controlled usage)
  React.useEffect(() => {
    setPreview(image || null);
  }, [image]);

  const handleFileSelect = (file) => {
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        file,
        preview: e.target.result,
        name: file.name,
        size: file.size
      };

      setPreview(imageData);
      if (onImageUpload) onImageUpload(imageData);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = async () => {
    // If you want to delete from backend, call deleteImage here
    if (preview && preview.backendPath) {
      try {
        await deleteImage(preview.backendPath);
      } catch (err) {
        // Optionally handle backend delete error
      }
    }
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageUpload) onImageUpload(null);
  };

  return (
    <div className="image-uploader">
      {!preview ? (
        <motion.div
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="upload-icon"
            animate={{
              scale: dragOver ? 1.2 : 1,
              rotate: dragOver ? 360 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            📷
          </motion.div>

          <h3>Upload Rice Leaf Image</h3>
          <p>Drag and drop your image here, or click to browse</p>

          <motion.button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnalyzing}
          >
            Choose Image
          </motion.button>

          <div className="upload-info">
            <small>Supported: JPG, PNG, WEBP • Max size: 5MB</small>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            hidden
            disabled={isAnalyzing}
          />
        </motion.div>
      ) : (
        <motion.div
          className="preview-zone"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="preview-header">
            <h4>Selected Image</h4>
            <motion.button
              className="btn btn-secondary btn-sm"
              onClick={clearImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnalyzing}
            >
              Remove
            </motion.button>
          </div>

          <div className="preview-image-container">
            <img
              src={preview.preview}
              alt="Selected rice leaf"
              className="preview-image"
            />
            {isAnalyzing && (
              <motion.div
                className="analysis-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="scanning-line" />
                <div className="analysis-text">Analyzing...</div>
              </motion.div>
            )}
          </div>

          <div className="image-info">
            <span className="file-name">{preview.name}</span>
            <span className="file-size">
              {(preview.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
});

export default ImageUploader;