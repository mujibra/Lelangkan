const { User, Item, Profile } = require("../models");
const bcrypt = require("bcryptjs")

class Controller {
  static home(req, res) {
    let option = {
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
        res.render(data)
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
            return res.redirect("/")
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
}

module.exports = Controller