const Review = require('../Models/Review.js');

class Reviews {
    static async index(req, res) {
        try {
            const reviews = await Review.all(200)
            res.json(
                reviews
            );
        } catch (error) {
            console.log(error);
        }
    }

    static async show(req, res) {
        try {
            console.log(`Show`);

            const review = await Review.find(req.params.id);
            res.json(
                review
            );
        } catch (error) {
            console.log(error);
        }

    }

    static async showByProductId(req, res) {
        try {
            console.log(`PID`);
            const review = await Review.findByProductId(req.params.id);
            res.json(
                review
            );
        } catch (error) {
            console.log(error);
        }

    }

    static async showByCustomerId(req, res) {
        try {
            console.log(`CID`, req.params.id);
            const review = await Review.findByCustomerId(req.params.id);
            res.json(
                review
            );
        } catch (error) {
            console.log(error);
        }

    }

    static async create(req, res) {
        try {


            await Review.create(req.body);
            res.json({
                'message': "success"
            })
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = Reviews