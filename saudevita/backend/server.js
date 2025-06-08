require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const indicadorRoutes = require('./routes/indicador.routes');
const alertaRoutes = require('./routes/alerta.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Rotas da API
app.use('/api', indicadorRoutes);
app.use('/api', alertaRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
