const psql = require('../db');

async function insertImg (nome, image) {
    let resposta; 
    const conexao = await psql.conexao();
    try {
        const result = await conexao.query(`
            INSERT INTO imagens (autor, img)
            VALUES('${nome}', $1)
        `, [image]); // Passa os valores como parâmetros

        resposta = {
            sucesso : true,
            resp : `Imagem Postada com Sucesso!`
        };
    } catch (error) {
        resposta = {
            sucesso : false,
            resp : error
        };
    }
    return resposta;
}


async function getAllImgs () {
    let resposta;
    const conexao = await psql.conexao();
    try {
        const result = await conexao.query(`
            SELECT * FROM imagens
            ORDER BY id DESC
        `)
        resposta = {
            sucesso : true,
            resp : result.rows
        }
    } catch (error) {
        resposta = {
            sucesso : false,
            resp : error
        }
    }
    return resposta
}
module.exports = { insertImg, getAllImgs }