const Category = require('../Models/Category.js');
const ExceptionHandler = require('../Exceptions/Handler.js');
const CategoryExceptions = require('../Exceptions/CategoryExceptions.js');

class Categories {

    static async index(req, res) {
        try {
            const categories = await Category.all(5);

            res.json(
                categories
            );
        } catch (error) {
            ExceptionHandler.handle(res, new CategoryExceptions(error));
        }

    }

    static async show(req, res) {
        try {
            const category = await Category.find(req.params.id);
            res.send([{
                category
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new CategoryExceptions(error));
        }
    }

    static async update(req, res) {
        try {
            const message = await Category.update(req.body, req.params.id);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new CategoryExceptions(error));
        }
    }

    static async update(req, res) {
        try {
            const message = await Category.create(req.body);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new CategoryExceptions(error));
        }
    }

    static async delete(req, res) {
        try {
            const message = await Category.delete(req.params.id);
            res.send([{
                message
            }])
        } catch (error) {
            ExceptionHandler.handle(res, new CategoryExceptions(error));
        }
    }
}

module.exports = Categories;