const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "postgres",
    port: 2022
});

client.connect();

client.query(`Select * from games`, (err, res)=>{
    if(err){
        console.log(err);
    }else{
        console.log(res.rows);
    }
    client.end();
})
