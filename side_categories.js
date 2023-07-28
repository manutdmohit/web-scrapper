const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://books.toscrape.com/index.html';

async function getBooks(url) {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const lists = $('.nav-list ul li a').text();
    console.log(lists);
  } catch (error) {
    console.error(error);
  }
}

getBooks(url);
