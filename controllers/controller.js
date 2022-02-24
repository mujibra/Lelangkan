const {User, Item, Profile} = require("../models");

class Controller {
    static home(req, res){
        let option = {
            where: {type: 'seller'},
            attributes: ['username'],
            include: [
                {
                  model: Profile,
                  attributes: ['name']
                },
                {
                  model: Item,
                  attributes: ['name', 'picture']
                }
              ]
        }
        User.findAll(option)
        .then((data) => {
            console.log(data[0])
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller