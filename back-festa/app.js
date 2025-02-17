const express = require('express');
const multer = require('multer');
const cors = require('cors');
const images = require('./model/images');
const port = 8080;

const app = express();
const corsOptions = {
    origin : "https://pedro-souza-vasconcellos.github.io",
   //origin : "http://127.0.0.1:5500",
   methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image') ,async (req, res) => {
    const { nome } = req.body;
    const imagem = req.file.buffer;
    if (!imagem) {
        return res.status(404).json({message : 'Imagem Não Encontrada'})
    }
    try {
        const resposta = await images.insertImg(nome, imagem);
        res.status(201).json({resp : resposta});        
    } catch (error) {
        res.status(500).json({erro : error})
    }
})
app.get('/getAllImgs', async (req, res) => {
    try {
        const resposta = await images.getAllImgs();
        res.status(200).json({resp : resposta});
    } catch (error) {
        res.status(500).json({erro : error})
    }
})


app.listen(port, () => {
    console.log(`Servidor Rodando em ${port}`);
})





