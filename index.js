const express = require("express")

const app = express();
const port = 3000;
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static(path.join(__dirname,'static')))
app.use('/images', express.static(path.join(__dirname,'images')))
app.use('/sounds', express.static(path.join(__dirname,'sounds')))


const sqlite3 =require("sqlite3").verbose();
let db= new sqlite3.Database('./scores.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err){
        return console.error(err.message);
    }
    console.log('Connected to the scores database')
});
app.set('db',db)

db.serialize(()=>{
    db.run(`
            CREATE TABLE IF NOT EXISTS SCORES(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            score INTEGER NOT NULL
            )
            `);
});


app.get("/", (req, res) =>
{
    res.render(
        path.resolve(__dirname, "./game_view.html")
    )
});

const table=`SELECT * FROM scores order by score desc`

app.get("/sendDatabase",(req, res) => {
    // randN=Math.floor(Math.random()*100)
    // res.json({randN: randN})
    db.all(table,(err,data)=>{
        if (err) {
            console.error(err.message);
        }
        else{
            res.json({data:data});
        }
    })
});
app.post("/receiveScore",(req, res) => {
    const newScore=req.body.score;
    console.log(newScore);
    db.run("INSERT INTO scores VALUES(NULL,?)",[newScore],(err)=> {
        if (err) {
            console.error(err.message);
        }else {
            console.log("new score succesuly added")
        };
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.use((req, res, next) => {
    res.status(404);
    res.send('<h3>Not found on the server</h3>');
});