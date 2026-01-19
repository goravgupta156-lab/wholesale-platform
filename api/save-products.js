const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  // Step 2 ka link yahan se connect hoga
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    // Step 5 Fix: Agar data array nahi hai toh use array bana do
    const products = Array.isArray(req.body) ? req.body : [req.body];

    const result = await client
      .db("RishuOrnaments")
      .collection("Products")
      .insertMany(products);

    res.status(200).json({ success: true, count: result.insertedCount });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}