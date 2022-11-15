const postcss = require('postcss');
const postcssNested = require('postcss-nested');
const fs = require('fs');
const path = require('path');

fs.readFile('./app.css', (err, css) => {
  if (err) {
    console.log(err);
  }
  const processor = postcss().use(postcssNested);

  processor.process(css, { from: './app.css', to: 'dist/app.css' }).then(result => {

    fs.writeFile('./dist/app.css', result.css, (err)=> {
      if (err) {
        throw Error(err);
      }
    })

    if (result.map) {
      fs.writeFile('./dist/app.css.map', result.map.toString(), () => true);
    }
  })
})