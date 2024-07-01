import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'localgpt'
});

db.connect((err) => {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log('db connected successful');
});

app.get('/', (req,res) => {

    const query = 'SELECT * FROM login';
    db.query(query,(err,result) => {
        if (err){
            console.log(err);
            return;
        }
        res.json({result})

    })
    
})

// Endpoint for handling login
app.post('/login', (req, res) => {
    const { uid, password } = req.body;
    const query = `SELECT * FROM login WHERE uid = '${uid}' AND password = '${password}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (result.length > 0) {
            const user = result[0];
            res.json({ status: "success", role: user.role }); 
        } else {
            res.status(401).json({ status: "error", message: "Invalid credentials" });
        }
    });
});



// chatgpt

const responses = {
    "hello": "Hello! How can I assist you today?",
    "how are you?": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
    "what is your name?": "I'm ChatGPT, your virtual assistant.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "bye": "Goodbye! Have a great day!"
  };
  
  app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    const botResponse = responses[userMessage] || "I'm not sure how to respond to that. Can you ask something else?";
    res.send({ reply: botResponse });
  });



app.listen(8081, () => {
    console.log('Listening on port 8081');
});
