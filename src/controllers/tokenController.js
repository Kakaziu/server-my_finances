const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) =>{
    const user = new User(req.body)

    try{ 
        await user.login()

        if(user.errors.length > 0) return res.status(400).json({ errors: user.errors })

        const token = jwt.sign({ id: user.user.id, email: user.user.email }, process.env.SECRET)

        res.header('authorization', token)
        return res.json({
            user: user.user,
            token
        })
    }catch(e){
        return res.status(401).json({ errors: ['Não foi possível fazer login.'] })
    }
}

exports.validateToken = async (req, res) =>{
    const token = req.body.token

    try{
        const userData = jwt.verify(token, process.env.SECRET)
        const user = await User.show(userData.id)

        return res.json(user)
    }catch(e){
        return res.status(401).json({ errors: ['Token inválido ou expirado.'] })
    }
}