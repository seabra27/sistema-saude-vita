# SaúdeVita

Plataforma Full Stack para democratização do acesso à informação de saúde pública em comunidades carentes.

## ✨ Propósito
O SaúdeVita visa empoderar líderes comunitários, agentes de saúde e moradores, facilitando o acesso a dados de vacinação, doenças sazonais e campanhas preventivas, promovendo a conscientização e o direito à saúde.

## 🖥️ Tecnologias Utilizadas
- **Front-end:** React.js, Chart.js, Bootstrap, CSS3
- **Back-end:** Node.js, Express.js, Mongoose
- **Banco de Dados:** MongoDB

## 📁 Estrutura do Projeto
```
saudevita/
  backend/         # API Node.js/Express
  frontend/        # Aplicação React
  README.md        # Este arquivo
```

## 🚀 Como rodar o projeto localmente

### 1. Pré-requisitos
- Node.js (v16+ recomendado)
- npm (v8+)
- MongoDB (local ou Atlas)

### 2. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo-saudevita.git
cd saudevita
```

### 3. Instale as dependências
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 4. Configure o ambiente
Crie um arquivo `.env` na pasta `backend` com:
```
MONGODB_URI=mongodb://localhost:27017/saudevita
PORT=5000
```
Ajuste a string de conexão se usar MongoDB Atlas.

### 5. Popule o banco com dados de exemplo (opcional)
```bash
cd backend
node seed.js
```

### 6. Inicie o MongoDB
Se local, rode:
```bash
mongod
```

### 7. Rode o backend
```bash
cd backend
npm start
```

### 8. Rode o frontend
```bash
cd ../frontend
npm start
```
Acesse em [http://localhost:3000](http://localhost:3000)

## 📝 Funcionalidades
- Dashboard com KPIs, gráficos e alertas de saúde
- Filtros avançados: região, doença, vacina, faixa etária, status, data
- Cadastro de indicadores de saúde (vacinação, doenças, campanhas)
- Visual moderno, responsivo e acessível
- Seção de notícias e dicas de saúde

## 🧑‍💻 Contribuição
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

## 🌍 Deploy no GitHub Pages/Render/Vercel
- O frontend pode ser publicado no Vercel, Netlify ou GitHub Pages (`npm run build` na pasta frontend)
- O backend pode ser hospedado no Render, Heroku, Railway ou servidor próprio
- Configure variáveis de ambiente conforme o serviço

## 📢 Dicas para uso
- Use dados reais e atualizados para maior impacto social
- Personalize as doenças/vacinas conforme a realidade local
- Incentive o compartilhamento das informações na comunidade

## 📚 Licença
MIT

---
Projeto desenvolvido para fins acadêmicos e sociais. Contribua para democratizar o acesso à saúde!
