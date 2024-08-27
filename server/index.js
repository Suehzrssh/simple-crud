const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "12345678",
    database: "employeesystem"
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;




    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send(result);
            }
            
        }
    )
});

app.get('/employers', (req, res) => {
    db.query("SELECT * FROM employees;", (err, result) => {
        if(err) {
            console.log(err);
            
        }else {
            res.json(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM employees where id = ?', id, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("server is running on 3001 port");
});