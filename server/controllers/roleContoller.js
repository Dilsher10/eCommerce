const rolesModel = require("../models/rolesModel")

module.exports.addRole = async(req,res) => {
    const role = req.body.role
    const permissions = req.body.permissions

    const newRole = await new rolesModel({role, permissions})
    const isSaved =  await newRole.save()

    if (isSaved) {
        return res.send({ code: 200, message: 'Role Added Successfully' });
    } else {
        return res.send({ code: 500, message: 'Server Error' });
    }
}



module.exports.deleteRole = (req,res) => {
    return res.send({code: 200, message: 'role deleted'})
}