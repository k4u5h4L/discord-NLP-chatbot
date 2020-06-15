// index.js

require("dotenv").config();

const Discord = require("discord.js");
const { prefix } = require("./config.json");

const client = new Discord.Client();

const DIALOGFLOW_TOKEN = process.env.DIALOGFLOW_TOKEN;
const DIALOGFLOW_SESSION_ID = process.env.DIALOGFLOW_SESSION_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const apiai = require("apiai")(DIALOGFLOW_TOKEN);

client.once("ready", () => {
  console.log("ready!");
});

client.on("message", (message) => {
  // console.log(message.content);

  if (message.content.startsWith(`${prefix}chat`)) {
    const userQuestion = message.content.replace(`${prefix}chat `, "");
    console.log(`User asked: ${userQuestion}`);

    // message.channel.send(userQuestion);
    let apiaiReq = apiai.textRequest(userQuestion, {
      sessionId: DIALOGFLOW_SESSION_ID,
    });

    apiaiReq.on("response", (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log(`Bot reply: ${aiText}`);
      message.channel.send(aiText);
    });

    apiaiReq.on("error", (error) => {
      console.log(error);
    });

    apiaiReq.end();
  }
});

client.login(DISCORD_TOKEN);
