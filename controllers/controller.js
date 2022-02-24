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
                  attributes:['id', 'name', 'picture'],
                }
              ]
        }
        User.findAll(option)
        .then((data) => {
          // console.log(data[0].username)
          // res.send(data[0].Items[0].name)
          res.render('homepage',{data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static itemDetail(req, res){
      let {id} = req.params
      console.log(id)
      Item.findByPk(id)
      .then((item) => {
        // console.log(item)
        res.render('productpage', {item})
      })
      .catch((err) => {
        res.send(err)
      })
    }
}

module.exports = Controller