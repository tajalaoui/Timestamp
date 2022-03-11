// server.js
// where your node app starts

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() })
})

app.get("/api/:date", function (req, res) {
  let { date } = req.params

  if (!isNaN(Date.parse(date))) {
    let dateObject = new Date(date)
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() })
  } else if (/\d{5,}/.test(date)) {
    let dateInt = parseInt(date)
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() })
  } else {
    res.json({ error: "Invalid Date" })
  }
})

// listen for requests :)
var listener = app.listen(3000, function (req, res) {
  console.log("Your app is listening on port " + listener.address().port)
})
