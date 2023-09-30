let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use("/public", express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  if (req.method === 'GET') {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
  }
  next();
});

app.route("/name")
  .get(function(req, res){
  console.log(req.query);
  res.json({ name: `${req.query.first} ${req.query.last}`});
})
.post(function(req, res){
    console.log(req.body.first);
    res.json({ name: `${req.body.first} ${req.body.last}`});
  });


app.get("/now", function(req, res, next){
  req.time = (new Date()).toString();
  next();
}, function(req, res) {
  res.json({
    time: req.time
  });
});



  


app.get("/:word/echo", function(req, res){
  res.json({ echo: req.params.word });
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase"){
    message = message.toUpperCase();
  }
  const data = {
    "message" : message
  };
  res.json(data);
});

app.get("/", (req, res) => {
  const filePath = __dirname + "/views/index.html";
  console.log(filePath);
  res.sendFile(filePath);
});

 module.exports = app;
