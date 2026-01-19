const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  // Yahan humne CommonJS format use kiya hai jo warning khatam kar dega
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    
    // Step 5 ka fix: Safe check for array
    const products = Array.isArray(req.body) ? req.body : [req.body];

    const result = await client
      .db('RishuOrnaments')
      .collection('Products')
      .insertMany(products);

    return res.status(200).json({ success: true, count: result.insertedCount });

  } catch (err) {
    // Isse humein asli error browser console mein dikhega
    return res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
};