const mongoose = require('mongoose')

const transitionSchema = new mongoose.Schema({
    title: { type: String, require: true },
    value: { type: Number, required: true },
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now() }
})

const transitionModel = mongoose.model('Transition', transitionSchema)

class Transition{
    constructor(body){
        this.body = body,
        this.errors = [],
        this.transtion = null
    }

    static async show(id){
        const transition = await transitionModel.findOne({ _id: id }).populate('user')

        return transition
    }

    static async delete(id){
        const transitionDeleted = await transitionModel.findByIdAndDelete(id)

        return transitionDeleted
    }

    static async index(){
        const transitions = await transitionModel.find().populate('user')

        return transitions
    }

    async store(){
        this.validate()
        if(this.errors.length > 0) return 

        this.transtion = await (await transitionModel.create(this.body)).populate('user')
    }

    async edit(id){
        this.validate()
        if(this.errors.length > 0) return

        this.transition = await transitionModel.findByIdAndUpdate({ _id: id }, this.body)
    }

    validate(){
        if(!this.body.title){
            this.errors.push('A transição deve conter um título.')
        }

        if(!this.body.value){
            this.errors.push('A transição deve conter um valor.')
        }

        if(!this.body.type){
            this.errors.push('Selecione o tipo da transição')
        }
    }
}

module.exports = Transition