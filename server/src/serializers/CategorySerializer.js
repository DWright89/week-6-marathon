

class CategorySerializer{

    static getSummary(category){
        const allowedAttributes = ["id", "name"]
        const serializedCategory = {}
        for (const attribute of allowedAttributes){
            serializedCategory[attribute] = category[attribute]
        }
        return serializedCategory
    }

    static async getDetails(category) {
      const allowedAttributes = ['id', 'name']
      const serializedCategory = {}
      for(const attribute of allowedAttributes) {
        serializedCategory[attribute] = category[attribute]
      }
      const relatedEvents = await category.$relatedQuery('events')
      serializedCategory.events = relatedEvents

      return serializedCategory
    }
}

export default CategorySerializer