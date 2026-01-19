// Region changed to Mumbai
const { MongoClient } = require('mongodb');

// Ye line Vercel ki settings se auto-link uthayegi
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('RishuOrnaments');
        const collection = db.collection('Products');
        
        const result = await collection.insertMany(req.body);
        
        return res.status(200).json({ message: "Success", count: result.insertedCount });
    } catch (error) {
        return res.status(500).json({ error: "DB Error", details: error.message });
    } finally {
        await client.close();
    }
}