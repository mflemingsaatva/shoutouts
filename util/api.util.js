const axios = require('axios');

exports.request = ({
	url,
	method,
	headers,
	params,
}) => {
	console.log(`📧  sending req to ${url}`);
	return axios({
		url,
		method,
		headers,
		params,
	}).then(res => res.data);
};

exports.respond = (res, data, ok = true, error) => {
	console.log(`🚨 ok? ${ok}`, data, error);
	res.send({ data, ok, error });
};
