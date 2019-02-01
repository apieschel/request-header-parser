const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
	let ip = req.headers['x-forwarded-for'];
	if(ip) {
		ip = req.headers['x-forwarded-for'].split(',').shift();
	} else {
		ip = req.connection.remoteAddress;
	}
  res.json({"ipaddress": ip, "language": req.headers["accept-language"], "software": req.headers["user-agent"]});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
