const pg = require('pg');

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const db = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT

function conexao(){
    const obj ={ 
        user : user,
        host : host,
        database : db,
        password : password,
        port : port
    };
    return new pg.Pool(obj);
}

exports.conexao = conexao;
