import fetch from 'isomorphic-fetch'
import {API} from '../config'

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
};
