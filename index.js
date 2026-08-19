const mineflayer = require('mineflayer');

const botOptions = {
  host: 'minigames.mcsh.io', 
  username: 'ikeepthebebion', 
  auth: 'offline',
  version: '1.21.11' // <-- Add this exact line here
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot has joined the server!');

    // Jump and look around every 15 seconds to stay active
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.look(Math.random() * 360, 0);
    }, 15000);
  });

  // Automatically reconnect if the server restarts or kicks the bot
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

createBot();
