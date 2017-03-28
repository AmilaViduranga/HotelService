function statusHandler() {
	this.SuccessStatus = function(res) {
		res.header("Content-Type", "application/json");
		res.write(JSON.stringify({
            status: 200,
            message: 'Successfully process happened'
        }));
		return res.send();
	}

	this.ServerErrorStatus = function(res) {
		res.header("Content-Type", "application/json");
		res.write(JSON.stringify({
            status: 500,
            message: 'Serverside error, please contact server admin'
        }));
		return res.send();
	}

	this.userInvalidRequestErrorStatus = function(res) {
		res.header("Content-Type", "application/json");
		res.write(JSON.stringify({
            status: 404,
            message: 'Invalid request, please give valid request'
        }));
		return res.send();
	}
}

module.exports = new statusHandler();