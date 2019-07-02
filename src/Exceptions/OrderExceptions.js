class OrderExceptions {
    constructor(error) {
        this.message = error.message;
        this.status = error.status_code;
        this.type = "Orders";
    }
}
module.exports = OrderExceptions;