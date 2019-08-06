const Product = require('../Models/Product.js');


class Products {

    static async index(req, res) {
        try {
            const products = await Product.all(5)
            res.json(
                products
            );
        } catch (error) {
            console.log(error);
        }
    }

    static async show(req, res) {
        try {
            const product = await Product.find(req.params.id);
            res.json(
                product
            );
        } catch (error) {
            console.log(error);
        }

    }

    static async create(req, res) {
        try {
            const message = await Product.create(req.body);
            res.send([{
                'message': message
            }])
        } catch (error) {
            console.log(error);
        }
    }

    static async productsByCategory(req, res) {
        try {
            const products = await Product.getProductsByCategory(req.params.id);
            res.json(products);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Products;