const getToken = function () {
    var token = localStorage.getItem('access_token');
    return token;
};

const $ = require('jquery')

const origin = "http://127.0.0.1:9000/api/v1"

export { getToken, $, origin };