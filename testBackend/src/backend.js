exports.resolvers = {
    Query: {
      getAirlines: async () => {
        try {
          const res =  await axios.get("https://api.instantwebtools.net/v1/airlines");
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }, 

        
  }}
  