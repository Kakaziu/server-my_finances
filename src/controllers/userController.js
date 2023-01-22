const User = require('../models/User')

exports.register = async (req, res) =>{
    const user = new User(req.body)

    try{
        await user.register()

        if(user.errors.length > 0) return res.status(400).json({ errors: user.errors })

        return res.json(user.user)
    }catch(e){
        return res.status(400).json({ errors: ['Erro ao cadastrar o usuário.'] })
    }
}