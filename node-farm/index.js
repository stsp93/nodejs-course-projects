const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

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


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));


const server = http.createServer((req, res) => {
    
    const {query, pathname} = url.parse(req.url,true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        
        res.end(output);

        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        // API page
    } else if (pathname === '/api') {
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