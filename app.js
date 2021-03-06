const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    var getParams = url.parse(req.url, true).query;

    if (
        !Number.isInteger(parseInt(getParams.base)) ||
        !Number.isInteger(parseInt(getParams.add)) ||
        !Number.isInteger(parseInt(getParams.profit)) ||
        !Number.isInteger(parseInt(getParams.rate))
    ) {
        res.end('Please, specify integer GET parameters: base, add, profit, rate. For example : https://tableof24entries.herokuapp.com/?base=10000&add=5000&profit=50&rate=50');
    }

    var html = ejs.render(fs.readFileSync('var.ejs', 'utf8'), {
        base: parseInt(getParams.base), 
        add: parseInt(getParams.add),
        profit: parseInt(getParams.profit), 
        rate: parseInt(getParams.rate) 
    });
    res.end(html);
});

server.listen(process.env.PORT || 8080,  function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});

