class ProductException {
    constructor(error) {
        this.message = error.message;
        this.status = error.status;
        this.type = "Products";
    }
}