const { gql } = require("apollo-server");
exports.typeDefs = gql`
  type Query {
    getAirlines: [Airline]
  }

  type Airline {
    id: ID
    name: String
    country: String
    logo: String
    slogan: String
    head_quaters: String
    website: String
    established: Int
  }
`;
