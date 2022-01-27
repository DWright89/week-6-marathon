class EventSerializer{
    static async getDetails(event){
        const allowedAttributes = ['id', 'name', 'description']
        const serializedEvent = {}
        for (const attribute of allowedAttributes) {
            serializedEvent[attribute] = event[attribute]
        }
        const relatedGuests = await event.$relatedQuery('guests')
        serializedEvent.guests = relatedGuests

        return serializedEvent
    }
}

export default EventSerializer