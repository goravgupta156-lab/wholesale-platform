const { MongoClient } = require('mongodb');

// Simple link bina kisi database name ke
const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

    try {
        await client.connect();
        // Ye line pehli baar mein khud database bana degi
        const db = client.db('RishuOrnaments');
        const result = await db.collection('Products').insertMany(req.body);
        
        return res.status(200).json({ message: "Success", count: result.insertedCount });
    } catch (error) {
        return res.status(500).json({ error: "DB Error", details: error.message });
    } finally {
        await client.close();
    }
}