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

export const logout = (user, next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
    return fetch(API + '/logout', {
        method : 'GET'
    })
        .then(response => {
            console.log("some response like logout successfully")
        })
        .catch(error => console.log(error));
}

export const setCookie = (key, value) => {
    if(process.browser)
    {
        cookie.set(key, value, {
            expires: 1
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
        return cookie.get(key);
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

//authenticates user by passing data to local storage and cookie
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

export const isAuthenticated = () => {
    if(process.browser) {
        const cookieIsChecked = getCookie('token');
        if(cookieIsChecked) {
            const userIsChecked = localStorage.getItem('user');
            if(userIsChecked) {
                return JSON.parse(userIsChecked);
            } else {
                return false;
            }
        }
    }
}



