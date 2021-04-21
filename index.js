const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const fileUpload = require('express-fileUpload');
const bodyParser = require('body-parser');
require('dotenv').config()

 
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nudw4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

 


app.use(bodyParser.json()); 

app.use(cors());

app.user(express.static('developer'))

const port = 8080;

app.get('/', (req, res) =>{
    res.send("mongo db is working!!!")
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const projectsForm = client.db("powerX").collection("projectsForm");
  app.post('/projectsForm', (req, res) => {
      const projectData = req.body;
      console.log(projectData);
      projectsForm.insertOne(projectData)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })
  client.close();


app.post('/addDeveloper',(req, res)=>{
    const file = req.files.file;
    const name = req.files.name;
    const email = req.files.email;
    console.log(name, email, file);
})


});



app.listen(process.env.PORT || port)
