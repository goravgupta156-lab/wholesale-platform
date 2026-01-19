const { MongoClient } = require('mongodb');

// Sahi format wala link
const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/RishuOrnaments?retryWrites=true&w=majority";

const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await client.connect();
        const db = client.db('RishuOrnaments');
        const collection = db.collection('Products');

        const result = await collection.insertMany(req.body);
        
        return res.status(200).json({ 
            message: "Success", 
            count: result.insertedCount 
        });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ 
            error: "Data save nahi hua", 
            details: error.message 
        });
    } finally {
        await client.close();
    }
}