const mineflayer = require('mineflayer');

const botOptions = {
  host: '15.235.217.54', // <-- Put your Paper server IP here
  port: 12930,                  // <-- Change if your server uses a custom port
  username: 'ikeepthebebion',    // <-- The name your bot will use on the server
  auth: 'offline'               // Tells the bot it is a cracked server
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
