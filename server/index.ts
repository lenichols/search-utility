
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const port = process.env.PORT || 5001;

delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];

const app = express();
app.use(express.json());

app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  let eventInterval = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(res.data)}\n\n`);
  }, 2000);

  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
