
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "o2x6a2s5", // I need to get the real projectId
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // I need to check how to get the token or run with npx sanity exec
});

