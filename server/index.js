const express = require("express");
var Mustache = require("mustache");
const { execFileSync, execSync } = require("child_process");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const port = 8080;
var jsonParser = bodyParser.json();
const fs = require("fs");
const utf8 = require("utf8");

app.use(cors());
app.post("/createEndpointResolvers", jsonParser, (res1, req1) => {
  const res2 = fs.readFileSync("./tmp", "utf8");
  let lines = res2.toString().trim().split(/\n/);
  let wrapped = "[" + lines.join(",") + "]";
  let endpoints = JSON.parse(wrapped);
  console.log(typeof endpoints);
  const template = `exports.resolvers = {
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
  `;
  let output = Mustache.render(template, { endpointData: endpoints });
  console.log(output);
  console.log("writing into existing file");
  fs.writeFileSync("../testBackend/src/backend.js", output);
});

app.post("/createTypeQueries", jsonParser, (res, req) => {
  const res3 = fs.readFileSync("./tmp", "utf8");
  let lines = res3.toString().trim().split(/\n/);
  let wrapped = "[" + lines.join(",") + "]";
  let endpoints = JSON.parse(wrapped);
  console.log(typeof endpoints);
  const template1 = `
  type Query {
    {{#endpointData}}
    {{methodName}}:{{outPut}}
    {{/endpointData}}
  }
  `;
  let outputForTypeQueries = Mustache.render(template1, {
    endpointData: endpoints,
  });
  console.log(outputForTypeQueries);
  console.log("writing typeQuries into existing file");
  fs.appendFileSync("./schema.graphql", outputForTypeQueries);
});

app.post("/createType", jsonParser, (res, req) => {
  const res3 = fs.readFileSync("./tmpTypes", "utf8");
  let lines = res3.toString().trim().split(/\n/);
  let wrapped = `[${lines.join(",")}]`;
  console.log(wrapped);
  let types = JSON.parse(wrapped.trim());
  const template2 = ` 
  {{#data}}
  type {{type}}{
    {{#fields}}
    {{fieldName}}:{{dataType}}
    {{/fields}}
  }
  {{/data}}
  `;
  console.log("hello");
  let outputForTypes = Mustache.render(template2, { data: types });
  console.log(outputForTypes);

  console.log("hello");
  fs.appendFileSync("./schema.graphql", outputForTypes);
});

app.post("/", jsonParser, (req, res) => {
  res.send("hey");
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
    );
  }
  let jsonEntry = { type: req.body.type, fields: [] };
  jsonEntry.fields.push(...req.body.formValue);

  fs.appendFileSync("./tmpTypes", JSON.stringify(jsonEntry) + "\n");

  for (const data of req.body.endpointData) {
    fs.appendFileSync("./tmp", JSON.stringify(data) + "\n");
  }

 
});

app.post("/start", () => {
  fs.appendFileSync(".env", "INTERNAL_DATABASE_PORT=7474\n");
  fs.appendFileSync(".env", "INTERNAL_DATABASE_PORT_2=7687\n");
  fs.appendFileSync(".env", "BACKEND_PORT=4000\n");
  
//  execSync('echo TYPEDEF="$(cat schema.graphql)" >> .env');
  let schema = fs.readFileSync("./schema.graphql");
  let typeStatement = `const { gql } = require("apollo-server");
  exports.typeDefs = gql\`${schema.toString()}\``;

  fs.writeFileSync("../testBackend/src/schema.js", typeStatement);
  execSync("cd ../testBackend && docker build -t backend .");
  execSync("docker-compose up -d");
});

app.post("/stop", () => {
  execSync("docker-compose down");
  fs.unlinkSync("./schema.graphql")
  fs.unlinkSync("./backend.js")
  fs.unlinkSync("./tmpTypes")
  fs.unlinkSync("./tmp")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
