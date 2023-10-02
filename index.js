const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs')
const get = async () => {
    try {
        const response = await axios.get('https://news.detik.com/internasional');
        const $ = cheerio.load(response.data);
        console.log($);
        const container = $('.media__title ');
        let data = []
        container.each((index, element) => {
            const headlineElement = $(element).text().trim();
            const link = $(element).find(`a`).attr(`href`)
            // console.log($(element).find(`a`).attr(`href`));
            data.push({
                no: index + 1,
                data: headlineElement,
                link: link
            })
            console.log(data);
        });
        fs.writeFileSync(`result.json`,JSON.stringify(data))
    } catch (error) {
        console.error('Error fetching the data', error);
    }
};

get();
console.log('jalan');
