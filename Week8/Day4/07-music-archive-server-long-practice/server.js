const http = require('http');
const fs = require('fs');
const { stringify } = require('querystring');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Your code here
    if(req.method==='GET' && req.url === '/artists'){
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json')
      return res.end(JSON.stringify(artists))
    }
    if(req.method==='GET' && req.url.startsWith('/artists')){
      const urlSplit = req.url.split('/')
      if(urlSplit.length == 3){
        const id = urlSplit[urlSplit.length-1]
        const targetArtist = artists[id]
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        return res.end(JSON.stringify(targetArtist))

      }

    }
    if(req.method==='POST' && req.url === '/artists'){
      res.statusCode = 201;
      const newArtistId  = getNewArtistId();
      req.body['artistId'] = newArtistId
      console.log(req.body)
      artists[newArtistId] = req.body
      res.setHeader('Content-Type','application/json')
      return res.end(JSON.stringify(req.body))
    }
    if(req.method==='PUT' || req.method==='PATCH' && req.url.startsWith('/artist')){
      const urlSplit = req.url.split('/')
      if(urlSplit.length == 3){
        res.statusCode = 200;
        const id = urlSplit[urlSplit.length-1]
        const targetArtist = artists[id]
        for(key of Object.keys(req.body)){
          targetArtist[key] = req.body[key]
        }
        res.setHeader('Content-Type','application/json')
        return res.end(JSON.stringify(targetArtist))
      }
    }
    if(req.method==='DELETE'  && req.url.startsWith('/artist')){
      const urlSplit = req.url.split('/')
      if(urlSplit.length == 3){
        res.statusCode = 200;
        const id = urlSplit[urlSplit.length-1]
        delete artists[id]
        res.statusCode = 200;
        res.setHeader('Content-Type','application/plain-text');
        return res.end("Successfully deleted")

      }
    }

    if(req.method==='GET' && req.url.startsWith('/artists')){
      const urlSplit = req.url.split('/')
      if(urlSplit.length == 4 && urlSplit.includes('albums')){
        const id = urlSplit[urlSplit.length-2]
        const allAlbums = []
        for(let key of Object.keys(albums)){
          if(albums[key].artistId == id){
            allAlbums.push(albums[key])
          }

        }
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        return res.end(JSON.stringify(allAlbums))
      }
    }



    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
