const express = require('express')
var Mustache = require('mustache');
const {execFileSync, execSync} = require('child_process')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = 8080
var jsonParser = bodyParser.json()
const fs = require("fs");

app.use(cors());
app.post('/createEndpointResolvers', jsonParser, (res1, req1)=>{
  const res2 = fs.readFileSync("./tmp","utf8");
  let lines = res2.toString().trim().split(/\n/);
  let wrapped = "[" + lines.join(",") + "]";
  let endpoints = JSON.parse(wrapped)
  console.log(typeof endpoints)
  const template = `const resolvers = {
    Query: {
      {{#endpointData}}
      {{methodName}}: async () => {
        try {
          const res =  await axios.{{fieldMethodName}}("{{URLName}}");
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }, 
      {{/endpointData}}

        
  }}
  `
let output = Mustache.render(template, {"endpointData":endpoints});
console.log(output)
console.log("writing into existing file");
fs.writeFileSync('./backend.js', output);
})

app.post('/createTypeQueries', jsonParser, (res, req)=>{
  const res3 = fs.readFileSync("./tmp","utf8");
  let lines = res3.toString().trim().split(/\n/);
  let wrapped = "[" + lines.join(",") + "]";
  let endpoints = JSON.parse(wrapped)
  console.log(typeof endpoints)
  const template1 = `const typeDefs = gql
  type Query {
    {{#endpointData}}
    {{methodName}}:{{outPut}}
    {{/endpointData}}
  }
  `
let outputForTypeQueries = Mustache.render(template1, {"endpointData":endpoints});
console.log(outputForTypeQueries)
console.log("writing typeQuries into existing file");
fs.appendFileSync('./backend.js', outputForTypeQueries);

})

app.post('/createTypes', jsonParser, (res, req)=>{
  const res3 = fs.readFileSync("./tmpTypes","utf8");
  let lines = res3.toString().trim().split(/\n/);
  let wrapped = "[" + lines.join(",") + "]";
  let types = JSON.parse(wrapped)
  console.log(typeof endpoints)
  const template2 = ` type ${req.body.type}{
  {{#formValue}}
  
    {{fieldName}}:{{dataType}}
    {{/formValue}}
  }
  `
let outputForTypes = Mustache.render(template2, {"formValue":types, type:type});
console.log(outputForTypes)

})



app.post('/', jsonParser,(req, res) => {
  res.send("hey")
  console.log("BODY ", req.body);
  let queries = [];
  for (const field of req.body.formValue) {
    queries.push(
    `${field.methodName}: async () => {
      try {
        const res =  await axios.${field.fieldMethodName}('${field.URLName}');
        return res.data;
      } catch (error) {
        console.log(error)
      }
    }`
    )
  }
  
  let resolverFunctions = `const resolverFunctions ={${queries.map(q => q)},}\n`
  // const graphql = `type ${req.body.type} {
 //   ${fields}
 // }`    

  
for (const data of req.body.endpointData) {
  fs.appendFileSync('./tmp', JSON.stringify(data)+ "\n" )
}
for (const data of req.body.formValue) {
  fs.appendFileSync('./tmpTypes', JSON.stringify(data)+ "\n" )
}


//console.log("writing into existing file");
//console.log("writing into existing file", req.body.URLName);


//fs.appendFileSync('./schema.graphql', graphql);
// if(req.body.step === 1) {
   //fs.writeFileSync('./backend.js', output);
//   fs.writeFileSync('./backend.js', customResolvers);
// }else {
//   fs.appendFileSync('./backend.js', )
// } 

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
