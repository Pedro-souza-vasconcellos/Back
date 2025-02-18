const cors = require('cors');
const multer = require('multer');
const images = require('../images');

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Define a origem permitida
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

const upload = multer({ storage: multer.memoryStorage() });

module.exports = async (req, res) => {
  cors(corsOptions)(req, res, async () => {  // Chamada correta do middleware CORS
    
    // Configura o multer para processar arquivos corretamente
    upload.single('imagem')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao processar o upload' });
      }

      // Certifique-se de que req.body foi preenchido corretamente
      console.log("Corpo da requisição:", req.body);
      console.log("Arquivo recebido:", req.file);

      const { nome } = req.body;
      const imagem = req.file?.buffer;  // Verifica se req.file está definido antes de acessar buffer

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
  });
};
