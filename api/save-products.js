const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/RishuOrnaments?retryWrites=true&w=majority";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('RishuOrnaments');
        const collection = db.collection('Products');
        
        const result = await collection.insertMany(req.body);
        return res.status(200).json({ message: "Success", count: result.insertedCount });
    } catch (error) {
        console.error("DB Error:", error);
        return res.status(500).json({ error: "Connection Failed", details: error.message });
    } finally {
        await client.close();
    }
}