
const { User, Item, Profile } = require("../models");
const formatRp = require("../helpers/formatRupiah")
const bcrypt = require("bcryptjs")

class Controller {
  static home(req, res) {
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
        res.render('homepage',{ data })
      })
      .catch((err) => {
        res.send(err)
      })
    }
  }

  static itemDetail(req, res){
    let {id} = req.params

    Item.findByPk(id)
    .then((item) => {
      // console.log(item)
      res.render('productpage', { item })
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static signInForm(req, res) {
    res.render("signin")
  }

  static addUser(req, res) {
    const { username, phone, email, password } = req.body

    User.create({ username, phone, email, password })
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
    const { username,  password } = req.body

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

  static logout (req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.redirect("/login")
    })
  }

}

module.exports = Controller