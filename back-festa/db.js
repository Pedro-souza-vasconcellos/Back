const pg = require('pg');

function conexao(){
    const obj ={ 
        user : 'postgres',
        host : 'yamanote.proxy.rlwy.net',
        database : 'railway',
        password : 'EBKVHpUEaSAXJxZIhtaJCVCGftiPUjiP',
        port : 34450
    };
    return new pg.Pool(obj);
}

exports.conexao = conexao;
