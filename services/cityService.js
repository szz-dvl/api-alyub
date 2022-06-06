const City = require("../models/city");


module.exports = {
    insertMany: async (list) => {
        await City.create(list);
    },
    get: async (population = 0, name = "") => {
        
        const match = {}

        if (population)
            match.population = { $gte: population }
        
        if (name)
            match.name = { $regex: name, $options : 'i' }

        return await City.find(match, { _id: 0 });
    }

}