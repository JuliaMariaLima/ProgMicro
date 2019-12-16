var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var axios = require('axios')
// create application/json parser
var jsonParser = bodyParser.json()

var URL = 'http://3ab5d6a8.ngrok.io'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/teste', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

/* POST FILE */
router.post('/sendCode/', jsonParser, (req, res) => {
  console.log(req.body)

  axios({
    method: 'POST',
    url: `${URL}/comandos`,
    data: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
  })
})

module.exports = router
