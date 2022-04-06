const fetch = require("node-fetch");

(async () => {
  const k = { graphql: "type:blabla" };
  const response = await fetch("http://localhost:8080/", {
    method: 'POST',
    body: JSON.stringify(k),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);
})();
