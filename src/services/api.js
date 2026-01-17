const MODEL_BACKEND_URL = process.env.REACT_APP_MODEL_BACKEND_URL;

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${MODEL_BACKEND_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  const data = await response.json();

  return {
    status: data.result === 'healthy' ? 'healthy' : 'diseased',
    disease: data.result === 'healthy' ? null : data.result,
    confidence: Math.max(...data.probs),
    message:
      data.result === 'healthy'
        ? 'Great news! Your rice plant appears to be healthy with no signs of disease.'
        : `Disease detected: ${data.result}.`,
    probs: data.probs,
  };
};

export const deleteImage = async (imagePath) => {
  if (!imagePath) return { success: true };

  const response = await fetch(`${MODEL_BACKEND_URL}/delete-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_path: imagePath }),
  });
  return await response.json();
};
