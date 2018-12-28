const Eris = require('eris');
const http = require('http')
const request = require('request');

 
var DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const bot = new Eris(DISCORD_BOT_TOKEN);   // Replace DISCORD_BOT_TOKEN in .env with your bot accounts token

var links = {
  // Format: Guild ID, webhook link
}

bot.on('ready', () => {                                // When the bot is ready
    console.log('Ready!');                             // Log "Ready!"
});

function logToDiscord(string) {
  bot.createMessage('486993393470144533', string)
}

bot.on('messageCreate', (msg) => {
  if (!msg.author.bot) {
    for (let guild of bot.guilds) {
      if (msg.channel.guild.id != guild[0]) {
        var myJSONObject = {
          content: msg.content,
          username: msg.author.username,
          avatar_url: 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar
        };
        request({
            url: links[guild[0]],
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject
        }, function (error, response, body){
            if (error != null) {
              console.log("ERROR:", error)
            }
        });
      }
    }
  }
});
 
bot.editStatus('online', {
  name: 'Bwoop Bwoop Bwoop...',
  type: 0
});

bot.connect();                                         // Get the bot to connect to Discord