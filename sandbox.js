const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./items.json', 'utf-8'))
data.forEach(element => {
    element.cretedAt = new Date()
    element.updatedAt = new Date()
});
console.log(data)

// 2. sequelize migration:generate --name add-new-column-typeUser <- key tambahan