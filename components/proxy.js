'use strict';

const axios = require('axios');

function initProxy(internalBaseUrl) {
    const axiosInstance = axios.create({
        baseURL: internalBaseUrl,
        timeout: 60000
    });

    return (path, method, data) => {
        return new Promise((resolve, reject) => {
            const request = {
                url: path,
                method: method,
                headers: {
                    'Accept': 'application/json; charset=utf-8'
                }
            }

            if (method == 'GET') {
                request.params = data
            } else {
                request.data = data
            }

            axiosInstance.request(request)
            .then((response) => {
                resolve({
                    status: response.status,
                    contentType: response.headers['content-type'],
                    data: response.data
                });
            }).catch((error) => {
                reject({
                    status: error.response.status,
                    contentType: error.response.headers['content-type'],
                    data: error.response.data
                })
            });
        });
    }
}

module.exports = initProxy;