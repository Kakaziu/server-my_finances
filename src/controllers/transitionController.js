const Transition = require('../models/Transition')

exports.index = async (req, res) =>{
    try{
        const allTransitions = await Transition.index()
        const userTranstions = allTransitions.filter(transition => transition.user._id.toString() === req.userId)

        return res.json(userTranstions)
    }catch(e){
        console.log(e)
        return res.status(400).json({ errors: ['Não foi possível achar as transições'] })
    }
}

exports.store = async (req, res) =>{
    const transition = new Transition({
        title: req.body.title,
        value: req.body.value,
        type: req.body.type,
        user: req.userId,
    })

    try{
        await transition.store()

        if(transition.errors.length > 0) return res.status(400).json({ errors: transition.errors })

        return res.json(transition.transtion)
    }catch(e){
        return res.status(400).json({ errors: ['Não foi possível salvar a transição'] })
    }
}

exports.delete = async (req, res) =>{
    const { id } = req.params

    try{
        await Transition.delete(id)

        return res.json({ msg: 'Transição deletada.' })
    }catch(e){
        return res.status(400).json({ errors: ['Não foi possível apagar a transição.'] })
    }
}

exports.edit = async (req, res) =>{
    const { id } = req.params
    const transition = new Transition(req.body)

    try{
        await transition.edit(id)

        if(transition.errors.length > 0) return res.status(400).json({ errors: transition.errors })

        return res.json({ msg: 'Transição editada.' })
    }catch(e){
        return res.status(400).json({ errors: ['Não foi possível editar a transição'] })
    }
}

exports.show = async (req, res) =>{
    const { id } = req.params

    try{
        const transition = await Transition.show(id)

        return res.json(transition)
    }catch(e){
        return res.status(400).json({ errors: ['Não foi possível achar a transição'] })
    }
}