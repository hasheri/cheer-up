const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ENDPOINT = "/functions/cheerUp";

// Endpoint for giving compliments (POST request)
app.post(ENDPOINT, async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).send({ error: 'Missing input name' });
  }
  const compliments = [
    "You are so amazing, " + input,
    "You have a wonderful aura, " + input,
    "Your name brings sunshine, " + input,
    "You are a ray of light, " + input,
    "You got this, " + input,
  ];
  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  res.send({ output: randomCompliment });
});

// Endpoint for function documentation (GET request)
app.get(ENDPOINT, (req, res) => {
  const docs = {
    name: "cheerUp",
    description: "Provides a random compliment to boost your mood!",
    input: {
      type: "string",
      description: "The name of the person you want to compliment",
      example: "Alice"
    },
    output: {
      type: "string",
      description: "A personalized compliment that includes the input name",
      example: "You are so amazing, Alice"
    }
  };
  res.send(docs);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
