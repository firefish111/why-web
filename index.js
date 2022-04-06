const expr = require("express"),
  app = expr(),
  serv = require("http").createServer(app),
  sass = require("sass"),
  f = require("fs");

app.set("view engine", "pug");
app.use(expr.static(`${__dirname}/public`));

app.use(expr.json());

let read = () => JSON.parse(f.readFileSync(`${__dirname}/data.json`));
let write = data => f.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data));

f.writeFileSync(
  "./public/main.css",
  sass.renderSync({
    file: "./style/main.scss",
    outputStyle: 'compressed',
    outFile: "./public/main.cssa",
  }).css.toString(),
);

app.get("/", (req, res) => {
  res.render("index.pug", {
    why: read()
  });
});

app.get("/start", (req, res) => {
  res.render("start.pug");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  write([...read(), req.body]);
});

serv.listen(7480);
