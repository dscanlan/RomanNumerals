const http = require('http');

module.exports = (app) => {
    const server = http.Server(app);
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
		console.log(`server listening on : ${port}`);
	});
};
