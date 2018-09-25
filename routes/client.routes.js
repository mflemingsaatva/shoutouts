
const path = require('path');

function htmlTemplate (user) {
	return `
		<!DOCTYPE html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					margin: 0;
					padding: 0;
					border: 0;
					font-size: 100%;
					font: inherit;
					vertical-align: baseline;
				}
			</style>
		</head>
		<html>
			<body style="">
				<script>
					(function () {
						window.stateData = {
							userName: '${user.name}',
							userId: '${user.id}',
							teamId: '${user.teamId}',
						}
					})()
				</script>
				<div id="root"></div>
				<script src="script.js"></script>
				
			</body>
		</html>
	`;
}

exports.root = (req, res) => {
	console.log('⭐️ req.session', req.session);
	if (req.session.user) {
	// if (true) {
		// console.log('⭐️ req.session', req.session);
		req.session.user = { name: 'Mike Fleming', id: 'UCTT63W6S', teamId: 'T0SU2LUKU' }
		res.writeHead( 200, { "Content-Type": "text/html" } );
		res.end(htmlTemplate(req.session.user));
	} else {
		res.sendFile(path.join(__dirname, '../auth.html'));
	}
};

exports.bundle = (req, res) => res.sendFile(path.join(__dirname, '../dist/bundle.js'));