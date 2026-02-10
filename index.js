require('dotenv').config();
const express = require('express');
const cors = require('cors');

// FIX: Use node-fetch to bypass SDK issues
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- HELPER FUNCTIONS ---
const calculateFibonacci = (n) => {
    if (typeof n !== 'number') return null;
    if (n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    while (sequence.length < n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
};

const isPrime = (num) => {
    if (typeof num !== 'number') return false;
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const filterPrimes = (arr) => {
    if (!Array.isArray(arr)) return null;
    return arr.filter(item => typeof item === 'number' && Number.isInteger(item) && isPrime(item));
};

const calculateGCD = (a, b) => {
    return b === 0 ? a : calculateGCD(b, a % b);
};

const calculateLCM = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') return null;
        result = (Math.abs(result * arr[i])) / calculateGCD(result, arr[i]);
    }
    return result;
};

const calculateHCF = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') return null;
        result = calculateGCD(result, arr[i]);
    }
    return result;
};

// --- ROUTES ---

// GET /health
app.get('/health', (req, res) => {
    res.json({
        "is_success": true,
        "official_email": "rizul1272.be23@chitkara.edu.in"
    });
});

// POST /bfhl
app.post('/bfhl', async (req, res) => {
    try {
        const body = req.body;
        let resultData = null;

        // 1. Fibonacci
        if (body.hasOwnProperty('fibonacci')) {
            const n = parseInt(body.fibonacci);
            if (isNaN(n)) return res.status(400).json({ is_success: false, message: "Invalid input" });
            resultData = calculateFibonacci(n);
        }
        // 2. Prime
        else if (body.hasOwnProperty('prime')) {
            if (!Array.isArray(body.prime)) return res.status(400).json({ is_success: false, message: "Invalid input" });
            resultData = filterPrimes(body.prime);
        }
        // 3. LCM
        else if (body.hasOwnProperty('lcm')) {
            if (!Array.isArray(body.lcm)) return res.status(400).json({ is_success: false, message: "Invalid input" });
            resultData = calculateLCM(body.lcm);
        }
        // 4. HCF
        else if (body.hasOwnProperty('hcf')) {
            if (!Array.isArray(body.hcf)) return res.status(400).json({ is_success: false, message: "Invalid input" });
            resultData = calculateHCF(body.hcf);
        }
        // 5. AI Integration (Using fetch)
        else if (body.hasOwnProperty('AI')) {
            if (typeof body.AI !== 'string') return res.status(400).json({ is_success: false, message: "Invalid input" });

            try {
                const apiKey = process.env.GEMINI_API_KEY;
                // Using gemini-1.5-flash as it is most reliable for free tier
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `Give a Single-word answer: ${body.AI}` }] }]
                    })
                });

                const data = await response.json();

                if (data.candidates && data.candidates[0].content) {
                    resultData = data.candidates[0].content.parts[0].text.trim();
                } else {
                    resultData = "Error: No AI response";
                }
            } catch (err) {
                console.error(err);
                return res.status(500).json({ is_success: false, message: "AI Error" });
            }
        }
        else {
            return res.status(400).json({ is_success: false, message: "Invalid Key" });
        }

        res.json({
            "is_success": true,
            "official_email": "rizul1272.be23@chitkara.edu.in",
            "data": resultData
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});