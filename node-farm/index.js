const http = require('http');
// const url = require('url');
const fs = require('fs');


// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// const textOut = `${textIn} - lorem ipsum \n created on ${Date.now()}`;
// fs.writeFileSync('./txt/input.txt',textOut);
// console.log('File written');

// console.log(textIn);

// let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
//     output = output.replace(/{%IMAGE%}/g,product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%ORIGIN%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

// ////// //////// ///// //////////
// Server
const replaceTemplate = function(temp, product) {
    let output = temp.split('{%PRODUCTNAME%}').join(product.productName);
    output = output.split('{%IMAGE%}').join(product.image);
    output = output.split('{%PRICE%}').join(product.price);
    output = output.split('{%ORIGIN%}').join(product.from);
    output = output.split('{%NUTRIENTS%}').join(product.nutrients);
    output = output.split('{%QUANTITY%}').join(product.quantity);
    output = output.split('{%DESCRIPTION%}').join(product.description);
    output = output.split('{%ID%}').join(product.id);

    console.log(product.organic);
    if(!product.organic){
        output = output.split('{%NOT_ORGANIC%}').join('not-organic');
    }
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;

    // Overview page
    if (pathName === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        
        res.end(output);

        // Product page
    } else if (pathName === '/product') {
        res.end('this is the product');

        // API page
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(data);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(3000, () => {
    console.log('Listening to request on port 3000');
})