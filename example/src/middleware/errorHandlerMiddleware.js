const Handler = (error, req, res, next) => {
	const errStatus = error.status;
	const errStatusCode = error.statusCode || 500;
	const errMessage = error.message || 'Something went wrong';
	res.status(errStatusCode).json({
		'status': errStatus,
		'code': errStatusCode,
		'message': errMessage
	})
}

const NotFound = (req, res, next) => {
	const err = new Error('The url you requested is not found!')
	err.status = false
	err.statusCode = 404

	next(err)
}

module.exports = {
	Handler,
	NotFound
}