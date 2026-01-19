const { MongoClient } = require('mongodb');

// Aapka wahi link jo aapne abhi nikala
const uri = "mongodb+srv://goravgupta156_db_user:TMypoYulbOpvNf5E@cluster0.bbxw5uq.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('RishuOrnaments');
            const products = database.collection('Products');
            
            // Saara data ek saath save hoga
            const result = await products.insertMany(req.body);
            
            res.status(200).json({ message: "Success", count: result.insertedCount });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}