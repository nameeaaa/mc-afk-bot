const mineflayer = require('mineflayer');
const http = require('http'); // <-- Added: Allows the bot to act like a website

// 1. Tiny web server so Render and UptimeRobot stay happy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot website is fully online!');
});
server.listen(process.env.PORT || 4000, () => {
  console.log('Web server is listening for pings!');
});

// 2. Your Minecraft Bot configuration
const botOptions = {
  host: 'minigames.mcsh.io', 
  username: 'ikeepbebion', 
  auth: 'offline',
  version: '1.21.11'
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

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

createBot();
