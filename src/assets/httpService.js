const request = require('request');

function requestCall(url, headers, method, body) {
	const options = {
		url: encodeURI(url),
		headers,
		body: JSON.stringify(body),
		method,
	};

	return new Promise((resolve, reject) => {
		request(options, (err, res) => {
			if (!err && (res.statusCode === 200 || res.statusCode === 201)) {
				const info = JSON.parse(res.body);
				resolve(info);
			} else {
				reject((res || {}).body);
			}
		});
	});
}

module.exports = {
	requestCall,
};