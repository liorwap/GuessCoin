import fetch from 'isomorphic-fetch'
import {API} from '../config'
import cookie from 'js-cookie'

export const signup = (user) => {
    return fetch(API + '/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/ason',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {return response.json();})
        .catch(error => console.log(error));
};

export const login = (user) => {
    return fetch(API + '/login', {
        method: 'POST',
        headers: {
            Accept: 'application/ason',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {return response.json();})
        .catch(error => console.log(error));
};

export const setCookie = (key, value) => {
    if(process.browser)
    {
        cookie.set(key, value, {
            expires: '1d'
        });
    }
};

export const removeCookie = key => {
    if(process.browser) {
        cookie.remove(key);
    }
};

export const getCookie = key => {
    if(process.browser) {
        cookie.get(key);
    }
}

export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.removeItem(key);
    }
}

