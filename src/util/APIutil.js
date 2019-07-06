import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getUser(id) {
    return request({
        url: API_BASE_URL + '/api/user/' + id,
        method: 'GET'
    })
}

export function getAllUser() {
    return request({
        url: API_BASE_URL + '/api/all-user',
        method: 'GET'
    });
}

export function deleteUser(requestBody) {
    return request({
        url: API_BASE_URL + '/api/user/delete',
        method: 'DELETE',
        body: JSON.stringify(requestBody)
    });
}

export function updateUser(requestBody, id) {
    return request({
        url: API_BASE_URL + '/api/user/' + id,
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}