class CustomerExceptions {
    constructor(error) {
        this.message = error.message;
        this.status = error.status_code;
        this.type = "Customer";
    }
}
module.exports = CustomerExceptions;