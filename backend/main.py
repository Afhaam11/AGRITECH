from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse  # ✅ Added for no-cache headers
from pydantic import BaseModel
import os
import time
from typing import List, Optional
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_huggingface import HuggingFaceEmbeddings

# Load environment variables
load_dotenv()

os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")
os.environ['HF_TOKEN'] = os.getenv("HF_TOKEN")

DATA_FOLDER = "research_papers"

# Global variables
llm = None
vector_db = None
embeddings = None

# Your existing functions
def load_embeddings():
    """Load the HuggingFace embedding model once and reuse."""
    global embeddings
    if embeddings is None:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    return embeddings

def load_llm():
    """Load the Groq LLM once and reuse."""
    return ChatGroq(
        groq_api_key=os.environ["GROQ_API_KEY"],
        model_name="llama-3.3-70b-versatile"
    )

def build_vector_database():
    """Load PDFs, split into chunks, and create FAISS vector DB."""
    embeddings = load_embeddings()
    loader = PyPDFDirectoryLoader(DATA_FOLDER)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)
    vector_store = FAISS.from_documents(chunks, embeddings)
    return vector_store

# ✅ Enhanced Lifespan event handler with better error handling
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global llm, vector_db
    print("🚀 Initializing Rice AI RAG Backend...")
    
    try:
        # Check environment variables
        if not os.environ.get("GROQ_API_KEY"):
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        print("📚 Loading LLM...")
        llm = load_llm()
        print("✅ LLM loaded successfully")
        
        # Check if research papers exist
        if not os.path.exists(DATA_FOLDER):
            raise ValueError(f"Research papers folder '{DATA_FOLDER}' not found")
        
        pdf_files = [f for f in os.listdir(DATA_FOLDER) if f.endswith('.pdf')]
        if not pdf_files:
            raise ValueError(f"No PDF files found in '{DATA_FOLDER}'")
        
        print(f"📄 Found {len(pdf_files)} PDF files: {pdf_files}")
        
        print("🔍 Building vector database from research papers...")
        vector_db = build_vector_database()
        print("✅ Vector database built successfully")
        
        print("🎉 Backend ready! Loaded research papers and initialized models.")
    except Exception as e:
        print(f"❌ Startup error: {e}")
        print(f"❌ Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        raise e
    
    yield  # App is running
    
    # Shutdown (optional cleanup)
    print("👋 Shutting down Rice AI RAG Backend...")

# ✅ Initialize FastAPI with lifespan
app = FastAPI(
    title="Rice AI RAG Backend", 
    version="1.0.0",
    lifespan=lifespan
)

# ✅ Enhanced CORS for better compatibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = "rice_agriculture"
    timestamp: Optional[int] = None  # ✅ Added for cache busting

class ChatResponse(BaseModel):
    response: str
    confidence: float
    sources: List[dict]
    suggestions: List[str]
    processing_time: float

# Enhanced prompt template
PROMPT_TEMPLATE = """
You are an AI assistant specializing in rice agriculture and disease management.
Use the research paper context to provide accurate, helpful answers to farmers and agricultural professionals.

Context from research papers:
{context}

Question: {input}

Instructions for your answer:
- Read the context above first before answering
- Use only information from the context when possible
- Provide practical, actionable advice for rice farmers
- Write clear, numbered points when listing information
- If the context doesn't contain relevant information, say so clearly
- Focus on rice diseases, treatments, prevention, and farming practices
- Keep answers concise but comprehensive

Answer:
"""

prompt = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy" if llm and vector_db else "initializing",
        "message": "Rice AI RAG Backend",
        "models_loaded": bool(llm and vector_db),
        "timestamp": int(time.time())  # ✅ Added timestamp for cache busting
    }

@app.post("/api/chat")  
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint with no-cache headers."""
    if not llm or not vector_db:
        raise HTTPException(status_code=503, detail="Backend still initializing")
    
    try:
        print(f"📝 Processing message: {request.message}")  # ✅ Debug logging
        
        # Your existing RAG logic
        retriever = vector_db.as_retriever(search_kwargs={"k": 3})
        document_chain = create_stuff_documents_chain(llm, prompt)
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        
        start_time = time.time()
        response = retrieval_chain.invoke({'input': request.message})
        end_time = time.time()
        
        print(f"🔍 RAG response generated in {end_time - start_time:.2f}s")  # ✅ Debug logging
        
        # Process source documents
        sources = []
        if 'context' in response:
            for i, doc in enumerate(response['context'][:3]):
                sources.append({
                    "title": f"Research Paper {i+1}",
                    "content": doc.page_content[:200] + "...",
                    "metadata": getattr(doc, 'metadata', {})
                })
        
        # Generate follow-up suggestions
        suggestions = generate_follow_up_questions(request.message, response['answer'])
        
        # ✅ Create response data
        response_data = {
            "response": response['answer'],
            "confidence": 0.95,
            "sources": sources,
            "suggestions": suggestions,
            "processing_time": round(end_time - start_time, 2)
        }
        
        # ✅ Return JSONResponse with no-cache headers to prevent 304
        json_response = JSONResponse(content=response_data)
        json_response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        json_response.headers["Pragma"] = "no-cache"
        json_response.headers["Expires"] = "0"
        json_response.headers["X-Timestamp"] = str(int(time.time()))
        
        print(f"✅ Response sent successfully")  # ✅ Debug logging
        return json_response
        
    except Exception as e:
        print(f"❌ Error processing request: {e}")  # ✅ Debug logging
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

def generate_follow_up_questions(original_question: str, answer: str) -> List[str]:
    """Generate contextual follow-up questions."""
    question_lower = original_question.lower()
    
    if any(keyword in question_lower for keyword in ['disease', 'infection', 'pest', 'problem', 'symptoms']):
        return [
            "How can I prevent this disease?",
            "What are the most effective treatments?",
            "How do I identify early symptoms?",
            "What causes this disease?"
        ]
    
    elif any(keyword in question_lower for keyword in ['treatment', 'cure', 'control', 'manage']):
        return [
            "What are organic treatment options?",
            "How long does treatment take?",
            "What are the prevention methods?",
            "Are there resistant rice varieties?"
        ]
    
    elif any(keyword in question_lower for keyword in ['farming', 'cultivation', 'growing', 'plant']):
        return [
            "What are optimal growing conditions?",
            "How often should I irrigate?",
            "What fertilizers work best?",
            "When is the best planting time?"
        ]
    
    else:
        return [
            "Tell me about rice disease prevention",
            "What are best farming practices?",
            "How can I improve rice yield?",
            "Common rice cultivation problems?"
        ]

# ✅ Optional: Add a test endpoint for debugging
@app.get("/test")
async def test_endpoint():
    """Test endpoint to verify backend is working."""
    return JSONResponse(
        content={
            "message": "Backend is working!",
            "llm_loaded": bool(llm),
            "vector_db_loaded": bool(vector_db),
            "timestamp": int(time.time())
        },
        headers={
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            "Pragma": "no-cache"
        }
    )
