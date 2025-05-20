# NeuroPitch AI

A modular SaaS platform for AI-powered sales enablement.

## Features

- 🎯 **SmartLead Scorer** – AI-powered lead scoring with detailed analysis
- 🎤 **VoiceBuddy Copilot** – AI voice assistant for sales calls (Coming Soon)
- 💬 **LeadFlow Chatbot** – Intelligent lead qualification chatbot (Coming Soon)
- 🛡️ **CallGuard Compliance** – Real-time compliance monitoring (Coming Soon)

## Tech Stack

- Frontend: Vite + React + TailwindCSS
- Backend: Node.js + Express
- AI: OpenAI GPT-4
- Deployment: Vercel (frontend) + Render (backend)

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Environment Setup

1. Create `.env` file in the root directory for frontend:
```
VITE_API_URL=http://localhost:3000
```

2. Create `.env` file in the server directory:
```
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
```

### Development

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the environment variables
4. Deploy

### Backend (Render)

1. Create a new Web Service in Render
2. Connect your repository
3. Set the environment variables
4. Deploy

## License

MIT
