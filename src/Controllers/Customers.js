const Customer = require('../Models/Customer.js');
const ExceptionHandler = require('../Exceptions/Handler.js');
const CustomerExceptions = require('../Exceptions/CustomerExceptions.js');

class Customers {

    static async index(req, res) {
        try {
            const categories = await Customer.all();

            res.json(
                categories
            );
        } catch (error) {
            ExceptionHandler.handle(res, new CustomerExceptions(error));
        }

    }

    static async show(req, res) {
        try {
            const Customer = await Customer.find(req.params.id);
            res.send([{
                Customer
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new CustomerExceptions(error));
        }
    }


    static async create(req, res) {
        try {
            const message = await Customer.create(req.body);
            res.json(
                message,
            );
        } catch (error) {
            ExceptionHandler.handle(res, new CustomerExceptions(error));
        }

    }

    static async update(req, res) {
        try {
            const message = await Customer.update(req.body, req.params.id);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new CustomerExceptions(error));
        }
    }


    static async delete(req, res) {
        try {
            const message = await Customer.delete(req.params.id);
            res.send([{
                message
            }])
        } catch (error) {
            ExceptionHandler.handle(res, new CustomerExceptions(error));
        }
    }
}

module.exports = Customers;