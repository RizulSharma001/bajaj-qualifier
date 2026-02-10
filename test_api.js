const http = require('http');

const makeRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body: body });
                }
            });
        });
        req.on('error', (e) => reject(e));
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

const runTests = async () => {
    console.log('Starting tests...');
    await new Promise(r => setTimeout(r, 1000));

    try {
        // Test 1: Health
        let res = await makeRequest({ port: 3000, path: '/health', method: 'GET' });
        console.log(`Test 1 (Health): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode})`);

        // Test 2: Fibonacci
        res = await makeRequest({ port: 3000, path: '/bfhl', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { fibonacci: 8 });
        console.log(`Test 2 (Fibonacci): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode}) - Result: ${JSON.stringify(res.body.data)}`);

        // Test 3: Prime
        res = await makeRequest({ port: 3000, path: '/bfhl', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { prime: [1, 2, 3, 4, 5] });
        console.log(`Test 3 (Prime): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode}) - Result: ${JSON.stringify(res.body.data)}`);

        // Test 4: LCM
        res = await makeRequest({ port: 3000, path: '/bfhl', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { lcm: [4, 6] });
        console.log(`Test 4 (LCM): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode}) - Result: ${res.body.data}`);

        // Test 5: HCF
        res = await makeRequest({ port: 3000, path: '/bfhl', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { hcf: [24, 36] });
        console.log(`Test 5 (HCF): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode}) - Result: ${res.body.data}`);

        // Test 6: AI
        res = await makeRequest({ port: 3000, path: '/bfhl', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { AI: "Capital of France?" });
        console.log(`Test 6 (AI): ${res.statusCode === 200 ? 'PASS' : 'FAIL'} (${res.statusCode})`);
        if (res.statusCode !== 200) console.log(`AI Error: ${JSON.stringify(res.body)}`);

    } catch (error) {
        console.error('Test failed:', error);
    }
};

runTests();
