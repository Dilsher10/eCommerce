const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const rolesModel = require("../models/rolesModel")

module.exports.signUp = async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const url = req.body.url || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiftolexia.com%2Ftestimonials%2Fclair-luka-saina%2F&psig=AOvVaw0ucNelNcegkrg1I1U9SL2u&ust=1715102568990000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCND1iZTF-YUDFQAAAAAdAAAAABAE';
    const type = req.body.type || 'USER';
    

    const roleData = await rolesModel.findOne({type: type})
    console.log(roleData, "13")
    const roles = [roleData._id];

    if (!name) {
        return res.send({ code: 400, message: 'Name Required.' });
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' });
    } else {
        const newUser = await new userModel({ url, type, name, password, roles })
        const isSaved = await newUser.save()
        if (isSaved) {
            res.send({ code: 200, message: 'Signup Successfully' });
        } else {
            res.send({ code: 500, message: 'Server Error' })
        }
    }

}



module.exports.login = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name) {
        return res.send({ code: 400, message: 'Name Required.' });
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' });
    } else {
        const isNameExits = await userModel.findOne({ name: name }).populate('roles')

        if (isNameExits) {
            console.log(isNameExits.password)

            if (isNameExits.password == req.body.password) {
                const token = jwt.sign({
                    expAfter: Math.floor(Date.now() / 1000) + (60 * 60),
                    name: isNameExits.name,
                    password: isNameExits.password,
                    type: isNameExits.type
                }, 'MYKEY');
                return res.send({ code: 200, message: 'Login Successfully', token: token, 
                user: isNameExits
            });
            } else {
                res.send({ code: 404, message: 'Password Wrong' });
            }
        } else {
            res.send({ code: 404, message: 'Name Not Found' });
        }
    }
}





module.exports.addToCart = async (req, res) => {

    const isUpdate = await userModel.updateOne({ _id: req.body.userId }, {
        $addToSet: { cart: req.body.productId }
    });

    if (isUpdate) {
        return res.send({ code: 200, message: 'Add to cart successfully' })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
}



module.exports.getCart = async (req, res) => {
    const userId = req.body.userId
    const data = await userModel.findOne({ _id: userId }).populate('cart')
    if (data) {
        return res.send({ code: 200, message: 'Get Cart Successfully', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
}