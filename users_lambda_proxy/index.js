'use strict';

const config = require('./config');
const proxy = require('../components/proxy')(config.proxy.internalBaseUrl);
const axios = require('axios');

exports.handler = (event, context, callback) => {
    let response;
    let data = {};

    if (!event.body.trim()) {
        data = event.queryStringParameters;
    } else {
        data = JSON.parse(event.body);
    }

    proxy(
        event.path,
        event.httpMethod,
        data
    ).then((data) => {
        response = {
            statusCode: data.status,
            headers: {'Content-Type': data.contentType},
            body: JSON.stringify(data.data)
        };
    }).catch((data) => {
        response = {
            statusCode: data.status,
            headers: {'Content-Type': data.contentType},
            body: JSON.stringify(data.data)
        };
    }).then(() => {
        callback(null, response);
    });
};
