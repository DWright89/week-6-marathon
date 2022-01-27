import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Event from "../../../models/Event.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const categoryEventsRouter = new express.Router({mergeParams: true})

categoryEventsRouter.post('/', async (req, res) => {
    const {body} = req
    const cleanedBody = cleanUserInput(body)
    const {name, description} = cleanedBody
    const {categoryId} = req.params
    console.log(cleanedBody, categoryId)
    try {
        const newEvent = await Event.query().insertAndFetch({name, description, categoryId})
        return res.status(201).json({event: newEvent})
    }catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({errors: error.data})
        }
        return res.status(500).json({errors: error})

    }
})

export default categoryEventsRouter