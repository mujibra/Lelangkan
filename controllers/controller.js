const { User, Item, Profile, sequelize } = require("../models");
const formatRp = require("../helpers/formatRupiah")
const bcrypt = require("bcryptjs")
const {Op} = require('sequelize')

class Controller {
  static home(req, res) {
    const {sort, search} = req.query
    console.log(sort, search)
    
    let option = {
      where: sort === 'username' ? { username: {[Op.startsWith]: search}, type: 'seller' } : { type: 'seller' },
      attributes: ['username'],
      include: [
        {
          model: Profile,
          attributes: ['name'],
          where: {
            name: {
              [Op.not]: null
            }
          }
        },
        {
          model: Item,
          attributes: ['id', 'name', 'picture'],
          where: sort === 'itemName' ? {name : {[Op.startsWith]: search}, id: {[Op.not]: null}} : {id: {[Op.not]: null}}
        }
      ]
    }
    User.findAll(option)
      .then((data) => {
        console.log(data)
        res.render('homepage', { data })
      })
      .catch((err) => {
        res.send(err)
      })
  }


  static itemDetail(req, res) {
    let { id } = req.params

    Item.findByPk(id)
      .then((item) => {
        // console.log(item)
        let priceFormatted = formatRp(item.price)
        res.render('productpage', { item, priceFormatted })
      })
      .catch((err) => {
        res.send(err)
      })

  }

  static signInForm(req, res) {
    res.render("signin")
  }

  static addUser(req, res) {
    const { username, phone, email, password, type } = req.body

    User.create({ username, phone, email, password, type })
      .then(() => {
        res.redirect("/")
      })
      .catch(err => res.send(err))
  }

  static logInForm(req, res) {
    const { error } = req.query
    res.render("login", { error })
  }

  static login(req, res) {
    const { username, password } = req.body

    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          const valid = bcrypt.compareSync(password, user.password)

          if (valid) {

            req.session.userId = user.id
            return res.redirect("/home")
          } else {
            const error = "invalid password / username"
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = "invalid password / username"
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => res.send(err))
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.redirect("/login")
    })
  }

  static productForm(req, res) {
    res.render("formJual")
  }

  static addProduct(req, res) {
    const { name, price, description, status, picture } = req.body

    Item.create({ name, price, description, status, picture })
      .then(() => {
        res.redirect("/home")
      })
      .catch(err => res.send(err))
  }

  static search(req, res) {
    // let sort = req.body
    // console.log(sort)
  }
}
module.exports = Controller