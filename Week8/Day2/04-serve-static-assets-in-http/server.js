const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  if(req.method==='GET' && req.url==='/'){
    const fileContents = fs.readFileSync('./index.html', 'utf-8');
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    return res.end(fileContents)
  }

  if(req.method==='GET' && req.url.startsWith('/static')){
    const fileRoute = req.url.split('/')
    const fileType = fileRoute[fileRoute.length-1].split('.')[1]
    const fileName = fileRoute[fileRoute.length-1].split('.')[0]
    if(fileType === 'jpg'){
      res.setHeader('Content-Type', 'image/jpeg');
      const image = fs.readFileSync(`./assets/images/${fileName}.${fileType}`);
      return res.end(image)

    }
    else if(fileType=== 'css'){
      res.setHeader('Content-Type', 'text/css');
      const css = fs.readFileSync(`./assets/css/${fileName}.${fileType}`);
      return res.end(css)
    }
  }

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
