"use strict";
import React, {Component} from "react";
import Subschema,{Form, loader, ValueManager, loaderFactory} from "Subschema";
import hello from 'hellojs';
import Login from './Login.jsx';
import LoginStyle from './Login.less';
import GithubProcessor from './GithubProcessor';

loader.addType({Login});
loader.addStyle({Login: LoginStyle});
loader.addProcessor({GithubProcessor});

const valueManager = ValueManager();
valueManager.addListener('login', (v)=> {
    console.log('login', v);
});

const schema = {
    "schema": {
        "login": {
            "type": "Login",
            "template": false
        },
        "organizations": {
            "type": "Autocomplete",
            "processor": "GithubProcessor",
            "url": "/user/orgs"
        },
        "repositories": {
            "type": "Autocomplete",
            "processor": "GithubProcessor",
            "url": "/user/repos"
        }
    },
    "fieldsets": [
        {
            "fields": "login"
        },
        {
            "legend": "Github Info",
            fields: ["organizations", "repositories"]
        }
    ]
};


export default class App extends Component {
    render() {
        return <div>
            <p>Subschema Github Integration</p>
            <Form schema={schema} loader={loader} valueManager={valueManager}/>
        </div>
    }
}