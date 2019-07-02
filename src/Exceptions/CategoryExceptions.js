class CategoryExceptions {
    constructor(error) {
        this.message = error.message;
        this.status = error.status_code;
        this.type = "Category";
    }
}
module.exports = CategoryExceptions;