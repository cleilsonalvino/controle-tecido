const express = require('express');
const { salvarDados, buscarDados } = require('./src/controllers/formController');
const app = express();

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para arquivos estáticos
app.use(express.static('public'));  // Este middleware vai servir arquivos da pasta 'public'

// Rotas

// Rota para salvar os dados
app.post('/salvar', salvarDados);

// Rota para buscar os dados
app.get('/:codigo', buscarDados);

// Rota padrão
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}\n http://localhost:3000/
`);
});
