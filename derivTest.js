const WebSocket = require('ws'); // Ensure 'ws' package is installed

const derivToken = "YOUR_DERIV_API_TOKEN"; // Replace with your actual token
const derivSocket = new WebSocket('wss://ws.deriv.com/websockets/v3');

// Event listener for when the connection opens
derivSocket.on('open', () => {
    console.log('✅ Connected to Deriv WebSocket');

    // Send an authorization request
    derivSocket.send(JSON.stringify({
        "authorize": derivToken
    }));
});

// Listen for messages from the server
derivSocket.on('message', (data) => {
    const response = JSON.parse(data);
    console.log('🔹 Response from Deriv:', response);

    if (response.error) {
        console.error("❌ Error:", response.error.message);
    } else if (response.authorize) {
        console.log("✅ Token is valid! User ID:", response.authorize.account_id);

        // Example: Fetch account balance after successful authorization
        derivSocket.send(JSON.stringify({
            "balance": 1
        }));
    }
});

// Handle connection errors
derivSocket.on('error', (error) => {
    console.error('❌ WebSocket Error:', error.message);
});

// Handle connection closure
derivSocket.on('close', () => {
    console.log('🔻 Connection closed');
});
