const resolvers = {
    Query: {
      getAirplanes: async () => {
        try {
          const res =  await axios.get("airplanes&#x2F;v1&#x2F;airplanes");
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }, 
      getUser: async () => {
        try {
          const res =  await axios.get("git&#x2F;v1&#x2F;userss");
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }, 
      getUser: async () => {
        try {
          const res =  await axios.get("&quot;git&#x2F;v1&#x2F;userss&quot;");
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }, 

        
  }}
  const typeDefs = gql
  type Query {
    getAirplanes:[Airplanes]
    getUser:user
    getUser:user
  }
  