const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    const token = req.header('authorization')

    if(!token) return res.status(401).json({ errors: ['Access denied.'] })

    try{
        const userData = jwt.verify(token, process.env.SECRET)

        req.userId = userData.id
        req.userEmail = userData.email

        next()
    }catch(e){
        return res.status(401).json({ errors: ['Token inválido ou expirado'] })
    }
}