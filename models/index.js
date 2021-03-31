const User = require('./User')
const Post = require('./Post')

User.belongsToMany(Post, {
    through: {
        model: 'post',
        unique: 'false'
    },
    as: 'posted_post'
})

module.exports = { User, Post }