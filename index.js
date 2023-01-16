const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const bodyParser = require('body-parser')
const scrapeTrustPilot = require('./scraper');

var jsonParser = bodyParser.json({limit: '50mb'})

// app.use(express.static('public'))

app.post('/api/getdata/trustpilot', jsonParser, async (req, res) => {
  
  if (!req.body.word) {
    res.status(400).json({ error: 'word is required' })
  } else {    
    var word = req.body.word;
    var searchId = req.body.search_id;
    var endPoint = req.body.end_point
    
    const results = await scrapeTrustPilot(word, searchId, endPoint)
    res.status(200).json(results)
  }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


