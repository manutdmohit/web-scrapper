const axios = require('axios');
const cheerio = require('cheerio');
const { index } = require('cheerio/lib/api/traversing');

async function scrapeData() {
  try {
    const url = 'https://brightdata.com'; // Replace this with the URL of the website you want to scrape

    // Send an HTTP GET request to the URL
    const response = await axios.request({
      method: 'GET',
      url: 'https://brightdata.com',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    const marketLeaderReasons = [];

    // scraping the "What makes Bright Data
    // the undisputed industry leader" section
    $('.elementor-element-ef3e47e')
      .find('.elementor-widget')
      .each((index, element) => {
        const image = $(element)
          .find('.elementor-image-box-img img')
          .attr('data-lazy-src');
        const title = $(element).find('.elementor-image-box-title').text();
        const description = $(element)
          .find('.elementor-image-box-description')
          .text();

        const marketLeaderReason = {
          title: title,
          image: image,
          description: description,
        };

        marketLeaderReasons.push(marketLeaderReason);
      });

    const customerExperienceReasons = [];
    // scraping the "The best customer experience in the industry" section
    $('.elementor-element-288b23cd .elementor-text-editor')
      .find('li')
      .each((index, element) => {
        const title = $(element).find('strong').text();
        // since the title is part of the text, you have
        // to remove it to get only the description
        const description = $(element).text().replace(title, '').trim();

        const customerExperienceReason = {
          title: title,
          description: description,
        };

        customerExperienceReasons.push(customerExperienceReason);
      });

    // console.log(customerExperienceReasons);

    const htmlElement = $('.elementClass');
    htmlElement.find('.elementor-element').each((index, element) => {
      console.log($(element).text());
    });

    // Extract data using CSS selectors
    const title = $('h1').text();
    const paragraphs = $('p')
      .map((index, element) => $(element).text())
      .get();

    // initializing the data structure
    // that will contain the scraped data
    const industries = [];

    // scraping the "Learn how web data is used in your market" section
    $('.elementor-element-7a85e3a8')
      .find('.e-container')
      .each((index, element) => {
        // extracting the data of interest
        const pageUrl = $(element).attr('href');
        const image = $(element)
          .find('.elementor-image-box-img img')
          .attr('data-lazy-src');
        const name = $(element)
          .find('.elementor-image-box-content .elementor-image-box-title')
          .text();

        // filtering out not interesting data
        if (name && pageUrl) {
          // converting the data extracted into a more
          // readable object
          const industry = {
            url: pageUrl,
            image: image,
            name: name,
          };

          // adding the object containing the scraped data
          // to the industries array
          industries.push(industry);
        }
      });

    console.log('Industries:', industries);

    // Do something with the extracted data
    console.log('Title:', title);
    console.log('Paragraphs:', paragraphs);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrapeData();
