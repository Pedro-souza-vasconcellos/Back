const cors = require('cors');
const images = require('../images');

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
};

module.exports = (req, res) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === 'GET') {
      try {
        const resposta = await images.getAllImgs();
        return res.status(200).json({ resp: resposta });
      } catch (error) {
        return res.status(500).json({ erro: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Método não permitido' });
    }
  });
};
