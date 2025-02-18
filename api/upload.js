const cors = require('cors');
const multer = require('multer');
const images = require('../images');

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",  // Use a variável de ambiente, com fallback para localhost
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

const upload = multer({ storage: multer.memoryStorage() });

module.exports = (req, res) => {
  cors(corsOptions);
      const { nome } = req.body;
      const imagem = req.file.buffer;

      if (!imagem) {
        return res.status(404).json({ message: 'Imagem Não Encontrada' });
      }

      try {
        const resposta = await images.insertImg(nome, imagem);
        return res.status(201).json({ resp: resposta });
      } catch (error) {
        return res.status(500).json({ erro: error.message });
      }
  });
};
