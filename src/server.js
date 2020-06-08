const express = require ("express")
const server = express()

//pegar o baco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:server,
    noCache:true
})



//configurar caminhos da Aplicacao
//pagina inicial
// re:Requisicao
// res:Resposta
//Criacao de Rotas
server.get("/", (req, res) => {
    return res.render("index.html")

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")

})

server.get("/search", (req, res) => {

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
    }
        const total = rows.length
        
//mostra  pagina html com os bancos de dados
    return res.render("search-results.html", { places: rows, total: total})
})


})

//ligar o servidor
server.listen(3000)