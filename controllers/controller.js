const { User, Item, Profile, sequelize } = require("../models");
const formatRp = require("../helpers/formatRupiah")
const bcrypt = require("bcryptjs")
const { Op } = require('sequelize');
const session = require("express-session");
const nodemailer = require('nodemailer')

class Controller {
  static home(req, res) {
    const { sort, search } = req.query
    // console.log(sort, search)

    let option = {
      where: sort === 'username' ? { username: { [Op.startsWith]: search }, type: 'seller' } : { type: 'seller' },
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
          where: sort === 'itemName' ? { name: { [Op.startsWith]: search }, id: { [Op.not]: null } } : { id: { [Op.not]: null } }
        }
      ]
    }
    User.findAll(option)
      .then((data) => {
        // console.log(data)
        res.render('homepage', { data })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static itemDetail(req, res) {
    let { id } = req.params
    const userId = req.session.userId
    // console.log(userId)
    Item.findByPk(id)
      .then((item) => {
        // console.log(item)
        let priceFormatted = formatRp(item.price)
        let redir
        if (userId === item.ownerId) {
          redir = `/editProduct/${id}`
        } else {
          redir = ''
        }
        res.render('productpage', { item, priceFormatted, redir })
      })
      .catch((err) => {
        res.send(err)
      })

  }

  static itemEdit(req, res) {

    let { id } = req.params
    const userId = req.session.userId

    Item.findByPk(id)
      .then((item) => {
        if (userId === item.ownerId) {
          res.render('editform', { item })
        }
      })
      .catch((err) => {
        res.send(err)
      })

  }

  static itemUpdate(req, res) {

    let { id } = req.params
    const ownerId = req.session.userId
    const { name, price, description, status, picture } = req.body
    let option = {
      where: {
        id: id
      }
    }
    console.log(id, req.body, ownerId)
    Item.update({ name, price, description, status, picture, ownerId }, option)
      .then(() => {
        res.redirect("/home")
      })
      .catch(err => res.send(err))

  }

  static signInForm(req, res) {
    res.render("signin")
  }

  static addUser(req, res) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "mjbramadhan@gmail.com", // generated ethereal user
        pass: 'Apaaj@909', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: '"Lelangkan!" <mjbramadhan@gmail.com>', // sender address
      to: User.email, // list of receivers
      subject: "Lelangkan account", // Subject line
      text: "Selamat Datang", // plain text body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent: %s", info.response);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    })

    console.log(req.body)
    const { name, location, username, phone, email, password, type } = req.body

    User.create({ username, phone, email, password, type })
      .then(() => {
        Profile.create({ name, location })
      })
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
            return res.redirect(`/home`)
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
    let ownerId = req.session.userId
    const { name, price, description, status, picture } = req.body

    Item.create({ name, price, description, status, picture, ownerId })
      .then(() => {
        res.redirect("/home")
      })
      .catch(err => res.send(err))
  }

}
module.exports = Controller