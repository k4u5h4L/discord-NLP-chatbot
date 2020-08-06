# Discord NLP Chatbot

This chatbot uses [Dialogflow](https://dialogflow.com/) to power AI of the bot.

## To call:

- The `!chat` command will provoke the bot. Anything following the call will be treated as a message or
  a question. The bot will read that question and answer accordingly.

- The `!covid` command will fetch you the confirmed and recovered cases. Anything following the call will be treated as
  the name of a country. The bot will scrap data accordingly using headless chrome and cheerio.

## New features:

- The bot will now fetch covid cases specific to a country when called.

## To install:

- Have all credencials of Dialogflow and your discord bot token ready.

- Clone and cd into the project

```
git clone https://github.com/k4u5h4L/discord-NLP-chatbot.git && cd discord-NLP-chatbot
```

- install dependencies

```
npm install
```

- Rename the `.env_sample` file to `.env`. Inside that, put the required API keys.

- Spin up the bot by using

```
npm run start
```

- When you get the `ready!` reply in your console, your bot is ready to go!

### Note:

- You can customise the reply either in discord itself, or make changes in the code, else you can head on to dialogflow
  and edit the properties of your NLP bot.

- This bot is for testing purposes only.
