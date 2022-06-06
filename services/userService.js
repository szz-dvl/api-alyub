const User = require("../models/user");
const { ObjectId } = require("mongodb")

module.exports = {
    insertOne: async (user) => {
        return await User.create(user);
    },
    updateOne: async (_id, mail, password) => {
        
        const update = {};

        if (mail)
            update.mail = mail;

        if (password)
            update.password = password;

        return await User.updateOne({ _id: new ObjectId(_id) }, { $set: update });
    }
}