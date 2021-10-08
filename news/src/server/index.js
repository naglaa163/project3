const dotenv = require('dotenv');
dotenv.config();
console.log(process.env)
var path = require('path')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const app = express()

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))


console.log(__dirname)
const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your api Key is ${process.env.API_KEY}`);
let urlInput = [] 

app.get('/', function (request, response) {
    response.sendFile('dist/index.html')
   // response.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (request, response) {
    response.send(mockAPIResponse)
})

// POST Route
app.post('/api', async function(request, response) {
    urlInput = request.body.url;
    console.log(`You entered: ${urlInput}`);
    const apiUrls = `${apiURL}key=${apiKey}&url=${urlInput}&lang=en`

    const resp = await fetch(apiUrls)
    const data = resp.json()
    console.log(data)
    response.send(data)
    
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



/*app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/
