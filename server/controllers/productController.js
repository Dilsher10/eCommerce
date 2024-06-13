const productModel = require('../models/productModel')

module.exports.addProduct = async (req, res) => {
    const newProduct = new productModel(req.body);
    const isSaved = await newProduct.save();
    if (isSaved) {
        res.send('Product Add Successfully');
    }
    else {
        res.send('Failed to save');
    }
}




module.exports.getProducts = async (req, res) => {
    const data = await productModel.find();
    if (data.length > 0) {
        res.send({ code: 200, message: 'Data Find Successfully', data: data });
    } else if (data.length == 0) {
        res.send({ code: 404, message: 'Product Not Found' })
    } else {
        res.send({ code: 500, message: 'Server Error' })
    }
}



module.exports.editProduct = async (req, res) => {

    let newData = {}

    if (req.body.url) {
        newData['url'] = req.body.url
    }

    if (req.body.name) {
        newData['name'] = req.body.name
    }

    if (req.body.category) {
        newData['category'] = req.body.category
    }

    if (req.body.seller) {
        newData['seller'] = req.body.seller
    }

    if (req.body.price) {
        newData['price'] = req.body.price
    }

    const id = req.body.id
    let filter = { _id: id }

    const data = await productModel.findOneAndUpdate(filter, newData, { new: true });
    if (data) {
        res.send({ code: 200, message: 'Product Edited Successfully', data: data });
    } else {
        res.send({ code: 500, message: 'Server Error' })
    }
}





module.exports.getProductById = async (req, res) => {
    const data = await productModel.findById(req.params.id);
    if (data) {
        res.send({ code: 200, message: 'Data Find By Id Successfully', data: data });
    } else {
        res.send({ code: 500, message: 'Server Error' })
    }
}




module.exports.deleteProducts = async (req, res) => {
    const ids = req.body
    const response = await productModel.deleteMany({ _id: { $in: ids } });
    if (response) {
        res.send({ code: 200, message: 'Product Deleted Successfully', data: response });
    } else {
        res.send({ code: 500, message: 'Server Error' })
    }
}