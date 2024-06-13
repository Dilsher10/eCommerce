const express = require('express')
const cors = require('cors')
const productController = require("./controllers/productController")
const userController = require("./controllers/userController")
const rolesController = require("./controllers/roleContoller")
const bodyParser = require('body-parser')
const app = express()
const port = 3001
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const db = require('./db')

// Add Product

app.post('/add-product', productController.addProduct)


// Fetch Products

app.get('/get-products', productController.getProducts)


// Edit Product

app.post('/edit-product', productController.editProduct)


// Fetch Product By Id

app.get('/get-product/:id', productController.getProductById)


// Delete Products

app.post('/delete-products', productController.deleteProducts)


// Signup User

app.post('/signup', userController.signUp)


// Login User

app.post('/login', userController.login)


// Add To Cart

app.post('/add-to-cart', userController.addToCart)


// Get Cart

app.post('/get-user-cart', userController.getCart)


// Add Role

app.post('/add-role', rolesController.addRole)


// Delete Role

app.post('/delete-role', rolesController.deleteRole)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})