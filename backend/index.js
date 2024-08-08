import express, { query } from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databadepath = path.join(__dirname, 'comment.db');
let database = null;

const db = new sqlite3.Database('comment.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cmt (
    id text,
    input TEXT NOT NULL,
    text TEXT,
    isactive BOOLEAN
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing the database connection:', err.message);
  } else {
    console.log('Database connection closed');
  }
});

const initializeDbAndServer = async () => {
    try {
        database = await open({
            filename: databadepath,
            driver: sqlite3.Database
        });
        app.listen(4000, () => console.log('Server running at port 4000'));
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

initializeDbAndServer();

app.get('/comm', async (req, res) => {
    const query = `SELECT * FROM cmt`
    const main = await database.all(query)
    res.send(main)
});

app.post('/savepost', async (req, res) => {
    const { id, input, text, isActive } = req.body;

    const query = `INSERT INTO cmt (id, input, text, isactive) VALUES (?, ?, ?, ?)`;

    try {
        await database.run(query, [id, input, text, isActive]);
        res.send('Comment Saved');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error saving comment');
    }
});

app.delete('/delete', async (req,res) => {
    const query = `DELETE FROM cmt`
    const m = await database.run(query)
    res.send('Deleted all the Data')
    console.log('Delete all the Data')
})

app.put('/update',async (req,res) => {
    const{id,editText} = req.body
    const query = `UPDATE cmt SET text = ? WHERE id = ?`
    const query1 = `SELECT * FROM cmt`
    try{
        const m = await database.run(query,[editText,id])
        const main = await database.all(query1)
       res.send(main)
    }catch(e){
        console.log(e.message)
    }
})
