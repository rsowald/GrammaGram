const User = require('./User')
const Post = require('./Post')

// User.belongsToMany(Post, {
//     through: {
//         model: 'post',
//         unique: 'false'
//     },
//     as: 'posted_post'
// })

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post }