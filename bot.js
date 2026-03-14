const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "1482355911942082692";

const WEBHOOK = "https://n8n-ventura-n8n.ntupvl.easypanel.host/webhook-test/discord-pdf";

client.once("ready", () => {
  console.log("BOT ONLINE:", client.user.tag);
});

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;
  if (message.attachments.size === 0) return;

  for (const file of message.attachments.values()) {

    if (!file.name.toLowerCase().endsWith(".pdf")) continue;

    await axios.post(WEBHOOK, {
      filename: file.name,
      url: file.url,
      user: message.author.username
    });

    console.log("PDF enviado para n8n:", file.name);
  }

});

const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);