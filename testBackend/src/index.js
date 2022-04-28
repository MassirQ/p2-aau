const axios = require('axios').default;
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { loadSchema } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')

const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");
const fs = require("fs");

// (You may need to replace your connection details, username and password)
const AURA_ENDPOINT = 'neo4j+s://d38ac132.databases.neo4j.io';
const USERNAME = 'neo4j';
const PASSWORD = 'guc6IQaY6L1RVDbFaZea2n4k0R48rtZ_NbNjS1PnuWA';
(async () => {
// Create Neo4j driver instance
// const driver = neo4j.driver(AURA_ENDPOINT, neo4j.auth.basic(USERNAME, PASSWORD), { } );
const driver = neo4j.driver('neo4j://localhost:7687',neo4j.auth.basic("neo4j", "abc123"));
let argv = process.argv.slice(1);
// let type = "Plain"npm;
// let graphql = ` type ${type} {
//     name: String
//     born: Int
//     knows: [${type}!]! @relationship(type: "KNOWS", direction: OUT)
//     friendCount: Int @cypher(statement:"RETURN SIZE((this)-[:KNOWS]->(:Person))")
//   }
//   type Car {
//       make: String
//       model: String
//       year: Int

//   }`

// await fs.writeFileSync("src/schema.graphql", graphql);

// let schemaDef = await fs.readFileSync("src/schema.graphql");
const resolvers ={
  Query: {
    getUser: async (_,{username}) => {
      try {
        const res =  await axios.get(`https://api.github.com/users/${username}`);
        return res.data;
      } catch (error) {
        console.log(error)
      }
    }, 
    getAirlines: async () => {
      try {
        const res = await axios.get('https://api.instantwebtools.net/v1/airlines');
        return res.data;
      } catch (error) {
        console.log(error)
      }
    }
  }
}
const typeDefs = gql`
   type Query {
     getUser(username:String):User
     getAirlines: [Airline]
   }
   type Airline {
    id: ID,
        name: String,
        country: String,
        logo: String,
        slogan: String,
        head_quaters: String,
        website: String,
        established: Int
   } 
   type User {
     login: String
     id: ID!
     url: String
   } 
   type Computer {
       make: String
       model: String
   }`
// let typeDefs = gql`${process.env.TYPEDEF}`;

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers
});

// Generate schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});
})();