# FundBridge AI

FundBridge AI is an AI-powered funding discovery platform designed for startups and small businesses.

It helps businesses discover relevant grants, government schemes, loans, and investors based on their industry, location, business stage, and funding requirements.

## Features

- AI-powered funding discovery
- Personalized funding matching
- Grant recommendations
- Loan recommendations
- Investor discovery
- AI Strategist for funding and growth guidance
- Profile-based recommendations
- Funding and application tracking
- User authentication
- Business profile management
- Document management
- Funding analytics

## AI Integration

### Google Gemini

Google Gemini powers the intelligent AI capabilities of FundBridge, including the AI Strategist and funding-related reasoning.

Gemini helps interpret a business's:

- Industry
- Location
- Business stage
- Funding requirement
- Growth objectives

and provides more relevant funding insights and strategic guidance.

### Ollama + Gemma 3 4B

FundBridge also integrates Ollama with the Gemma 3 4B model for local AI capabilities.

This provides a hybrid AI architecture combining cloud-based Gemini capabilities with locally hosted AI.

## How Funding Matching Works

FundBridge uses the business profile to identify opportunities that are more relevant to the startup.

Matching considers factors such as:

- Industry
- Location
- Business stage
- Funding requirement
- Business profile

The recommendations can change as the business profile changes.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js

### Backend

- Node.js
- Express
- TypeScript
- REST APIs

### Database

- PostgreSQL
- Prisma ORM

### AI

- Google Gemini
- Ollama
- Gemma 3 4B

### Authentication

- JWT

## Project Structure

```text
fundbridge-ai/
│
├── backend/
│   ├── prisma/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── utils/
│
├── public/
│   ├── models/
│   └── robot-head.png
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   └── config/
│
├── package.json
└── README.md
