// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Habilita CORS para permitir requisições do lado do cliente
app.use(cors());

// Dados dos alunos
const alunos = [
  { matricula: "2023001", pontos: 18, media: 6 },
  { matricula: "2023002", pontos: 24, media: 7 },
  { matricula: "2023003", pontos: 30, media: 6 },
  { matricula: "2023004", pontos: 22, media: 5 },
  { matricula: "2023005", pontos: 26, media: 8 },
];

// Rota para verificar status do aluno
app.get('/verificar-status/:matricula', (req, res) => {
  const matricula = req.params.matricula;
  const aluno = alunos.find(aluno => aluno.matricula === matricula);
  const pontosMinimosAprovacao = 24;

  if (!aluno) {
    return res.json({ mensagem: "Matrícula não encontrada." });
  }

  const { pontos, media } = aluno;
  let statusMedia = pontos >= media ? "na média ou acima dela" : "abaixo da média";
  let statusAprovacao = pontos >= pontosMinimosAprovacao ? "aprovado" : "não aprovado";
  
  res.json({
    mensagem: `Status do aluno: ${statusMedia} e ${statusAprovacao}.`,
    statusAprovacao: statusAprovacao === "aprovado"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});