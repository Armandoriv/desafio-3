import express from 'express'
import ProductManager from './components/ars.js'

const app = express()
app.use(express.urlencoded({extended: true}))
const PORT = 8080

const productos = new ProductManager();
const readElements = productos.readProducts()

app.get("/products",async (req, res) => {
let limit = parseInt(req.query.limit);
if(!limit) return res.send(await readElements)
let allProducts = await readElements
let productLimit = allProducts.slice(0, limit)
 res.send(productLimit)
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readElements;
    let productsById = allProducts.find(product => product.id === id) 
    res.send(productsById)
})

const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del servidor ${error}`))










































/*const app = express()
const PORT = 4000

const productos = [
    {
        nombre: "Pokemon",
        id: 1,
        categoria: "juegazo"
    },
    {
        nombre: "Digimon",
        id: 2,
        categoria: "juegazo"
    },
    {
        nombre: "1000 juegos en 1",
        id: 3,
        categoria: "pirata"
    }
]

app.use(express.urlencoded({extended : true})) //Busquedas en url complejas

app.get('/', (req, res) => {
    res.send("Hola esta es la pagina de inicio")
})

app.get('/producto/:id', (req, res) => {
    console.log(productos.find(prod => prod.id === parseInt(req.params.id)))
    res.send("productos pa")
})

app.get('/producto', (req, res) => {

    let {categoria} = req.query
    console.log(productos.filter(producto => producto.categoria === categoria))
    res.send("producto route")
})

app.get('/contacto', (req, res) => {
    res.send("Hola esta es la pagina de contacto")
})

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
})*/