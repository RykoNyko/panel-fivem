
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example API endpoints
app.get('/api/stats', (req, res) => {
    res.json({
        playersOnline: 654,
        uptime: '05:32:10',
        serverStatus: 'Online'
    });
});

// Adding a POST endpoint to simulate server actions
app.post('/api/action', (req, res) => {
    const { action } = req.body;
    res.json({ message: `Action ${action} performed successfully!` });
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
