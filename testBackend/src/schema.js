const { gql } = require("apollo-server");
  exports.typeDefs = gql`
  type Query {
    getAirlines:[Airlines]
  }
   
  type Airlines{
    name:String
  }
  `