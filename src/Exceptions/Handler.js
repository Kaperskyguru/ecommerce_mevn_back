class ExceptionHandler {

    static handle(res, exception) {
        this.exception = exception
        new Handler(res, exception);
    }

}

class Handler {
    constructor(res, exception) {
        this.response = res;
        this.exception = exception;
        this.handle();
    }

    handle() {
        // Log to console
        this.logToConsole();
        // log to database
        this.logToDatabase();
        // send as json
        this.sendAsJSON();
    };

    logToConsole() {
        console.log(this.exception);
    }

    logToDatabase() {
        // Save to DB
    }

    sendAsJSON() {
        this.response.send([{
            message: this.exception.message,
            status: this.exception.status,
            type: this.exception.type
        }])
    }
}


module.exports = ExceptionHandler;