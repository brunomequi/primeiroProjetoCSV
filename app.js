const express = require('express'); //importa o pacote
const app = express(); // instancia o express
const port = 3001; //porta padrão
const mysql = require('mysql2');
const cors = require('cors'); //importando CORS

//parser json
app.use(express.json());
app.use(cors());

app.use('/', express.static('index'));
//requisições raiz
app.get('/', (req, res) => res.render('index.html'));

//rota clientes
app.get('/clientes', (req, res) => {
  execSQLQuery('SELECT * FROM Clientes', res);
});

app.get('/clientes/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM Clientes' + filter, res);
});

app.delete('/clientes/:id', (req, res) => {
  execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
});
app.post('/clientes', (req, res) => {
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  execSQLQuery(
    `INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`,
    res,
  );
});
//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'linux123',
    database: 'bancoapi',
  });

  connection.query(sqlQry, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log('executou!');
  });
}
