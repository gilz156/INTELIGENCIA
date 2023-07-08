const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu clave de API de OpenAI

// Envia la pregunta al servidor y muestra la respuesta
async function sendMessage() {
    var userInput = document.getElementById('user-input');
    var userMessage = userInput.value;

    if (userMessage.trim() !== '') {
        displayMessage('user', userMessage);
        userInput.value = '';

        // Envia la pregunta al servidor de OpenAI
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                prompt: `Pregunta: ${userMessage}\nRespuesta:`,
                max_tokens: 100,
                top_p: 0.7,
                n: 1
            })
        });

        const data = await response.json();

        // Obtiene la respuesta generada por el modelo de lenguaje
        const answer = data.choices[0].text.trim();
        displayMessage('bot', answer);
    }
}

// Muestra el mensaje en el chat
function displayMessage(sender, message) {
    var chatMessages = document.getElementById('chat-messages');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}
