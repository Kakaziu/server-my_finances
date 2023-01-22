const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: { type: String, required: true, minLength: 5, maxLength: 200},
    password: { type: String, required: true, minLength: 5, maxLength: 100 },
    createdAt: { type: Date, default: Date.now() }
})

const userModel = mongoose.model('User', userSchema)

class User{
    constructor(body){
        this.body = body,
        this.errors = [],
        this.user = null
    }

    static async show(id){
        const user = await userModel.findById(id)

        return user
    }

    async register(){
        this.validateRegister()
        if(this.errors.length > 0) return

        await this.userExist()
        if(this.errors.length > 0) return

        this.user = await userModel.create({
            name: this.body.name,
            email: this.body.email,
            password: bcryptjs.hashSync(this.body.password)
        })
    }

    async login(){
        this.validateLogin()
        if(this.errors.length > 0) return

        this.user = await userModel.findOne({ email: this.body.email })

        if(!this.user){
            this.errors.push('Usuário não encontrado.')
            return
        }

        const passwordMatch = bcryptjs.compareSync(this.body.password, this.user.password)

        if(!passwordMatch){
            this.errors.push('Senha incorreta.')
            return
        }
    }

    async userExist(){
        this.user = await userModel.findOne({ email: this.body.email })

        if(this.user){
            this.errors.push('Usuário já existe.')
        }
    }

    validateRegister(){
        if(!this.body.name || this.body.name.length < 3 || this.body.name.length > 50){
            this.errors.push('O campo nome deve conter de 3 a 50 caracteres.')
        }

        if(!this.body.email || !validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.')
        }

        if(!this.body.password || this.body.password.length < 5 || this.body.password.length > 100){
            this.errors.push('O campo senha deve conter de 5 a 100 caracteres.')
        }
    }

    validateLogin(){
        if(!this.body.email || !validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.')
        }

        if(!this.body.password || this.body.password.length < 5 || this.body.password.length > 100){
            this.errors.push('O campo senha deve conter de 5 a 100 caracteres.')
        }
    }
}

module.exports = User