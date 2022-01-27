const Model = require("./Model")

class Guest extends Model {
  static get tableName(){
    return "guests"
  }

  static get relationMappings() {
    const Event = require('./Event.js')
    const Invitation = require('./Invitation.js')

    return {
      invitations: {
        relation: Model.HasManyRelation,
        modelClass: Invitation,
        join: {
          from: 'guest.id',
          to: 'invitations.guestId'
        }
      },

      events: {
        relation: Model.ManyToManyRelation,
        modelClass: Event,
        join: {
          from: 'guest.id', //itself
          through: {
            from: 'invitations.guestId', //its own foreign key
            to: 'invitations.eventId' //the other foreign key
          },
          to: 'events.id' //the other table's id
        }
      }
    }
  }

  //from its primary key
  //THROUGH from foreign key
  // to other table's foreign key
  //to the other table's local key

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: { type: "string"},
        lastName: { type: "string"}
      }
    }
  }
}

module.exports = Guest