const express = require('express');
const { salvarDados, buscarDados } = require('./formController');
const app = express();
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware para CORS
app.use(cors({
  origin: 'https://controle-tecido.vercel.app',  // Permitir apenas essa origem específica
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization']  // Headers permitidos
}));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para arquivos estáticos
app.use(express.static('public'));  // Este middleware vai servir arquivos da pasta 'public'

// Rotas

// Rota para salvar os dados
app.post('/salvar', salvarDados);

// Rota para buscar os dados
app.get('/codigo/:codigo', buscarDados);

// Rota padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Garante o uso de caminho absoluto
});

app.get('/dados', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dados.html')); // Garante o uso de caminho absoluto
});

app.get("/tecidos", async (req, res) => {
  try {
    const tecidos = await prisma.controleTecido.findMany({
      select: {
        codigo: true,
        descricao: true,
        pesoTecido: true,
        tecido: true,
        metragem: true,
        tipo: true,
        pesoRisco: true,
        tamanhos: true,
        camadas: true,
        qtdCorte: true,
        concluido: true,
        criadoEm: true,
      },
    });
    res.json(tecidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tecidos." });
  }
});

// Atualizar um tecido
app.put("/tecidos/:codigo", async (req, res) => {
  const { codigo } = req.params;
  const data = req.body;
  try {
    const tecidoAtualizado = await prisma.controleTecido.update({
      where: { codigo: parseInt(codigo) },
      data,
    });
    res.json(tecidoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o tecido." });
  }
});

// Deletar um tecido
app.delete("/tecidos/:codigo", async (req, res) => {
  const { codigo } = req.params;
  try {
    await prisma.controleTecido.delete({
      where: { codigo: parseInt(codigo) },
    });
    res.json({ message: "Tecido deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o tecido." });
  }
});

  

// Inicia o servidor
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}\n http://localhost:3000/
// `);
// });


module.exports = app;


