const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson')

const converter = csv({
    noheader: false,
    headers: ['book','author','amount','price'],
    ignoreColumns: /(amount)/,
    colParser: {
        'price': 'number'
    }
})

pipeline(
    fs.createReadStream('./hw1/task2/nodejs-hw1-ex1.csv'),
    converter,
    fs.createWriteStream('./hw1/task2/task2-result.json'),
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  )