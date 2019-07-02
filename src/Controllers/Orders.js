const Order = require('../Models/Order.js');
const ExceptionHandler = require('../Exceptions/Handler.js');
const OrderExceptions = require('../Exceptions/OrderExceptions.js');


//TODO: Handle Exception properly

class Orders {

    static async index(req, res) {
        try {
            const orders = await Order.all();
            res.json(orders);
        } catch (error) {
            ExceptionHandler.handle(res, new OrderExceptions(error));
        }

    }

    static async show(req, res) {
        try {
            const order = await Order.find(req.params.id);
            res.send([{
                order
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new OrderExceptions(error));
        }

    }

    static async update(req, res) {
        try {
            const message = await Order.update(req.body, req.params.id);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new OrderExceptions(error));
        }

    }

    static async create(req, res) {
        try {
            const message = await Order.create(req.body);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new OrderExceptions(error));
        }

    }

    static async delete(req, res) {
        try {
            const message = await Order.delete(req.params.id);
            res.send([{
                message
            }]);
        } catch (error) {
            ExceptionHandler.handle(res, new OrderExceptions(error));
        }

    }
}
module.exports = Orders;