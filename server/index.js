const express = require('express')
const {execFileSync, execSync} = require('child_process')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = 8080
var jsonParser = bodyParser.json()
const fs = require("fs");

app.use(cors());
app.post('/', jsonParser,(req, res) => {
  res.send("hey")
  console.log("BODY ", req.body);
  let fields = "";
  for (const field of req.body.formValue) {
    fields += `${field.fieldName}:${field.dataType} \n`
   
  }
  const graphql = `type ${req.body.type} {
    ${fields}
  }`    


console.log("writing into existing file");

fs.appendFileSync('./schema.graphql', graphql);
  // take information and create graphql schema
  // execFileSync("./startServer.sh", ["7474", "7687", "4000", graphql])
 
})

app.post('/start', (req,res)=>{
  fs.appendFileSync(".env", "INTERNAL_DATABASE_PORT=7474\n")
  fs.appendFileSync(".env", "INTERNAL_DATABASE_PORT_2=7687\n")
  fs.appendFileSync(".env", "BACKEND_PORT=4000\n")
  // fs.appendFileSync(".env", `TYPDEF=${graphql}`)
  execSync("echo TYPEDEF=$(cat schema.graphql) >> .env")
  execSync("docker-compose up -d");
})

app.post('/stop', (req,res)=>{

  execSync("docker-compose down");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
