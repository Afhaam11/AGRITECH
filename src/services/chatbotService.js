class ChatbotService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
     console.log('[ChatbotService] Using baseURL:', this.baseURL); 
    this.isRAGEnabled = true;
  }

  async sendMessageToRAG(message) {
    console.log('🚀 [RAG] Attempting to call backend with:', message);
    
    try {
      // ...existing code...
const response = await fetch(`${this.baseURL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message }),
});
// ...existing code...

      console.log('📡 [RAG] Backend response status:', response.status);
      console.log('📡 [RAG] Backend response headers:', response.headers);

      if (!response.ok) {
        console.error('❌ [RAG] Backend returned error status:', response.status);
        const errorText = await response.text();
        console.error('❌ [RAG] Error details:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ [RAG] Successfully received data:', data);
      
      return {
        text: data.response,
        suggestions: data.suggestions || [],
        confidence: data.confidence || 0.9,
        sources: data.sources || [],
        processingTime: data.processing_time || 0,
        type: 'rag'
      };
    } catch (error) {
      console.error('❌ [RAG] Complete error details:', error);
      console.error('❌ [RAG] Error type:', typeof error);
      console.error('❌ [RAG] Error message:', error.message);
      throw error; // Re-throw to trigger fallback
    }
  }

  getLocalResponse(message) {
    console.log('🏠 [LOCAL] Using fallback response for:', message);
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('disease') || lowerMessage.includes('blast')) {
      return {
        text: `**[LOCAL FALLBACK]** Rice diseases can impact harvest. Common ones include Rice Blast, Bacterial Leaf Blight, and Brown Spot.`,
        suggestions: ['Rice Blast treatment', 'Prevention tips', 'Symptoms identification'],
        type: 'local'
      };
    }

    return {
      text: `**[LOCAL FALLBACK]** I can help with rice farming questions. What would you like to know?`,
      suggestions: ['Disease problems', 'Farming techniques', 'Treatment options'],
      type: 'local'
    };
  }

  async getChatResponse(message) {
  console.log('💬 [SERVICE] Getting response for:', message);
  console.log('🔧 [SERVICE] RAG enabled:', this.isRAGEnabled);
  
  // ✅ FORCE RAG to always try (for debugging)
  this.isRAGEnabled = true;
  
  try {
    console.log('🤖 [SERVICE] Trying RAG backend...');
    const ragResponse = await this.sendMessageToRAG(message);
    console.log('✅ [SERVICE] RAG response successful:', ragResponse);
    return ragResponse;
  } catch (error) {
    console.warn('⚠️ [SERVICE] RAG failed, falling back to local:', error);
    // Don't disable RAG for debugging
    // this.isRAGEnabled = false;
  }

  console.log('🏠 [SERVICE] Using local response');
  return this.getLocalResponse(message);
}


  async checkRAGHealth() {
    console.log('🏥 [HEALTH] Checking backend health...');
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        console.error('❌ [HEALTH] Health check failed with status:', response.status);
        this.isRAGEnabled = false;
        return false;
      }
      
      const data = await response.json();
      console.log('✅ [HEALTH] Health check response:', data);
      this.isRAGEnabled = data.models_loaded || false;
      return this.isRAGEnabled;
    } catch (error) {
      console.error('❌ [HEALTH] Health check error:', error);
      this.isRAGEnabled = false;
      return false;
    }
  }
}

export default new ChatbotService();
