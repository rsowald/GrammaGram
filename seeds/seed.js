const sequelize = require('../config/connection')
const { User, Post } = require('../models')

const userSeedData = require('./userSeedData.json')
const postSeedData = require('./postSeedData.json')

const seedDatabase = async () => {

    // Sync data
    await sequelize.sync({ force: true })

    // seed data 
    const users = await User.bulkCreate(userSeedData, { individualHooks: true });
    const posts = await Post.bulkCreate(postSeedData)

}

seedDatabase()