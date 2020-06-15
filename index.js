// index.js

require("dotenv").config();

const Discord = require("discord.js");
const { prefix } = require("./config.json");
const cases = require(__dirname + "/covid.js");

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

  if (message.content.startsWith(`${prefix}covid`)) {
    const covidQuestion = message.content.replace(`${prefix}covid `, "");
    console.log(covidQuestion);

    cases.scrap(message, covidQuestion);

    // console.log(covidData);
    // message.channel.send(
    //   `Confirmed cases in ${covidData.place} is ${covidData.confirmed} and ${covidData.recovered} have recovered.`
    // );
  }
});

client.login(DISCORD_TOKEN);
