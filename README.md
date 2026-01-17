# AGRITECH  
AI-Based Rice Leaf Disease Detection and Agricultural Assistance System

AGRITECH is an AI-driven web application designed to assist farmers and agricultural stakeholders in identifying rice leaf diseases and obtaining reliable agricultural guidance. The system combines deep learning–based image classification with an intelligent chatbot to support early disease detection and informed decision-making in rice cultivation.

The platform is developed with a modular architecture and is containerized using Docker to ensure scalability, portability, and ease of deployment.

## Project Overview

Rice crops are highly susceptible to leaf diseases that can significantly reduce yield if not detected early. Traditional diagnosis often requires expert intervention, which may not be readily accessible in rural regions. AGRITECH addresses this challenge by providing an automated disease detection system along with an AI-powered chatbot that delivers fact-based agricultural recommendations.

## Key Features

- Automated rice leaf disease detection using deep learning  
- Classification of common rice diseases such as bacterial leaf blight, rice blast, and brown spot  
- Confidence-based predictions with disease-specific insights  
- AI-powered agricultural chatbot using retrieval-augmented generation  
- Containerized deployment using Docker and Docker Compose  
- User-friendly web interface suitable for non-technical users  

## Technology Stack

Frontend  
- React.js  

Backend  
- Python  
- FastAPI  

Machine Learning  
- Convolutional Neural Networks (CNN)  
- Pretrained deep learning models for image classification  

Chatbot  
- Retrieval-Augmented Generation (RAG)  
- Vector database for document retrieval  
- Large Language Model for response generation  

Deployment  
- Docker  
- Docker Compose  

## System Architecture

The application follows a microservice-based architecture. The frontend provides the user interface for image uploads and chatbot interaction. The backend handles API requests, image preprocessing, and model inference. The disease detection module classifies uploaded rice leaf images, while the chatbot module retrieves relevant agricultural documents and generates accurate responses. Docker Compose orchestrates all services for seamless deployment.

## Setup and Installation

Prerequisites  
- Git  
- Docker  
- Docker Compose  

## Project Structure

AGRITECH/
│
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ ├── dockerfile
│ └── research_papers/
│
├── frontend/
│ ├── package.json
│ └── src/
│
├── docker-compose.yml
├── Dockerfile
└── README.md



## Results and Evaluation

The disease detection model demonstrates strong classification performance across multiple rice leaf disease categories. The chatbot improves usability by providing context-aware and document-backed agricultural guidance, reducing dependency on manual expert consultation.

## Future Enhancements

- Support for additional crops and diseases  
- Mobile application integration  
- Multilingual chatbot responses  
- Integration with weather and soil data  

## Author

Muhammed Afhaam Ali

