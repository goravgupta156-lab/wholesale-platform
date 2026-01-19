const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/RishuOrnaments?retryWrites=true&w=majority";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });
    const client = new MongoClient(uri, { connectTimeoutMS: 30000 }); // 30 second timeout for US server
    try {
        await client.connect();
        const result = await client.db('RishuOrnaments').collection('Products').insertMany(req.body);
        return res.status(200).json({ message: "Success", count: result.insertedCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
}