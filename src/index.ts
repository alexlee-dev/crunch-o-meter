import cheerio from 'cheerio';
import nfetch from 'node-fetch';

const crunchOMeter = async (location: string): Promise<number | void> => {
  try {
    const response = await nfetch(`https://www.crunch.com/locations/${location}`);
    const data = await response.text();
    const $ = cheerio.load(data);

    const percentage = $('#occupancy-info .progress-bar-wrapper .progress-background div').attr('style')?.split(' ')[1];
    if (!percentage) {
      throw new Error('Error parsing document');
    }
    const occupancy = parseFloat(percentage) / 100;
    return occupancy;
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = crunchOMeter;