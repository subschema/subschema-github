"use strict";
import hellojs from 'hellojs';

const {location:{hostname}} = window;

const redirect_url = ({
    'localhost.subschema.com': '',
    'subschema.github.io': '/subschema-github/'
})[hostname];

const hello = ({
    'localhost.subschema.com': {github: '627a431f51e3b60077a5'},
    'subschema.github.io': {github: '56da255b6232790f0ffe'}
})[hostname];

export const settings = {
    hello,
    network: {
        oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
        redirect_url
    }
};

let _gh;

export default function github(_settings = settings) {
    if (_gh) {
        return _gh;
    }
    hellojs.init(_settings.hello);
    window.github = _gh = hellojs('github', _settings.network);

    return _gh;
}

export function isAuth(_settings = settings) {
    return github(_settings).getAuthResponse('github')
}