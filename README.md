# Bajaj Health Qualifier Backend

This is a REST API backend built for the Bajaj Health Qualifier. It supports mathematical operations and AI integration using Google Gemini.

## Features

- **Health Check**: `GET /health`
- **Logic Endpoint**: `POST /bfhl`
    - **Fibonacci**: Generates Fibonacci sequence.
    - **Prime**: Filters prime numbers from an array.
    - **LCM**: Calculates Least Common Multiple of an array.
    - **HCF**: Calculates Highest Common Factor of an array.
    - **AI**: Integrates with Google Gemini for simple Q&A.

## Prerequisites

- Node.js (v14 or higher)
- Google Gemini API Key

## Installation

1. Clone the repository or download the source code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

## Usage

Start the server:
```bash
node index.js
```
The server will start on port 3000 (or the port specified in `.env`).

## API Endpoints

### 1. Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "is_success": true,
      "official_email": "rizul1272.be23@chitkara.edu.in"
  }
  ```

### 2. Main Logic
- **URL**: `/bfhl`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Examples:

**Fibonacci:**
```json
{ "fibonacci": 10 }
```

**Prime:**
```json
{ "prime": [1, 4, 5, 7, 10] }
```

**LCM:**
```json
{ "lcm": [12, 15, 20] }
```

**HCF:**
```json
{ "hcf": [12, 15, 20] }
```

**AI:**
```json
{ "AI": "What is the capital of India?" }
```

## Deployment

This project is configured for deployment on Vercel. 
Ensure the `GEMINI_API_KEY` environment variable is set in your Vercel project settings.
