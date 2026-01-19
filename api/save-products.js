const { MongoClient } = require('mongodb');

// Ye link serverless ke liye optimized hai
const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/RishuOrnaments?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        await client.connect();
        const collection = client.db('RishuOrnaments').collection('Products');
        
        // Admin panel se aaya hua data
        const result = await collection.insertMany(req.body);
        
        res.status(200).json({ message: "Success", count: result.insertedCount });
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: "Data save nahi hua", details: error.message });
    } finally {
        await client.close();
    }
}