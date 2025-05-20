import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = process.env.PORT || 3000;

// Request validation schema
const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  industry: z.string().min(1, 'Industry is required'),
  revenue: z.string().min(1, 'Revenue is required'),
  intent: z.string().min(1, 'Intent is required'),
});

app.get('/', (req, res) => {
  res.json({ message: 'NeuroPitch AI API is running' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.post('/api/score-leads', async (req, res) => {
  try {
    // Validate request body
    const validatedData = LeadSchema.parse(req.body);
    const { name, title, company, industry, revenue, intent } = validatedData;

    const prompt = `
      Please analyze this sales lead and provide a score from 1-100 along with detailed reasoning.
      
      Lead Information:
      - Name: ${name}
      - Title: ${title}
      - Company: ${company}
      - Industry: ${industry}
      - Annual Revenue: ${revenue}
      - Buying Intent Signals: ${intent}
      
      Please consider factors like:
      1. Decision-making authority based on title
      2. Company size and revenue potential
      3. Industry fit and market conditions
      4. Expressed buying intent and urgency
      5. Overall opportunity quality
      
      Provide your response in the following JSON format:
      {
        "score": <number between 1-100>,
        "reasoning": "<detailed explanation of the score>"
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert sales lead qualification AI. Analyze leads and provide detailed scoring explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error('Error scoring lead:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid request data',
        errors: error.errors,
      });
    }

    // Handle OpenAI API errors
    if (error.response?.status) {
      return res.status(error.response.status).json({
        message: 'Error communicating with AI service',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'An error occurred while scoring the lead',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 