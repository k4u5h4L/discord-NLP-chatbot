// covid.js

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

module.exports.scrap = scrap;

async function scrap(message, place) {
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     slowMo: 250, // slow down by 250ms
  //   });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`https://www.coronatracker.com/country/${place}/`);

  // screenshot part
  // await page.screenshot({ path: "screenshot-covid.png", fullPage: true });

  // page source part
  const html = await page.content();

  const $ = cheerio.load(html);

  const confirmed = $(".text-2xl.font-bold.text-red-600");
  const recovered = $(".text-2xl.font-bold.text-green-600");

  const confirmedData = confirmed.text();
  const recoveredData = recovered.text();

  if (confirmedData == "" || recoveredData == "") {
    console.log("Place doesnt exist");

    await browser.close();

    message.channel.send(`Unable to fetch data. Sorry :(`);

    return false;
  }

  console.log(
    `Confirmed cases in ${place} is ${confirmedData.trim()} and ${recoveredData.trim()} have recovered.`
  );

  message.channel.send(
    `Confirmed cases in ${place} is ${confirmedData.trim()} and ${recoveredData.trim()} have recovered.`
  );

  // console.log(urlElems.html());

  await browser.close();
}

// scrap("india");

// module.exports.scrap = scrap;
