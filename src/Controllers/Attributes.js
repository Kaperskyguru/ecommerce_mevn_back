const Attribute = require('../Models/Attribute')
class Attributes {
    static async index(req, res) {
        try {
            console.log("Was here");

            const attriutes = await Attribute.all();
            res.json(attriutes);
        } catch (error) {

        }
    }

    static async find(req, res) {
        try {
            const attriutes = await Attribute.find(req.params.id);
            res.json(attriutes);
        } catch (error) {

        }
    }
}
module.exports = Attributes;