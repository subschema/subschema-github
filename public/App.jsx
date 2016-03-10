"use strict";
import React, {Component} from "react";
import Subschema,{Form, PropTypes, loader, ValueManager, loaderFactory} from "Subschema";
import subschemaGithub from 'subschema-github';

loader.addLoader(subschemaGithub);

const valueManager = ValueManager();
valueManager.addListener(null, (v)=> {
    console.log('change', v);
}, {});

const schema = {
    "schema": {
        "login": {
            "type": "Login",
            "template": false
        },
        "organization": {
            "type": "ProcessorSelect",
            "processor": "GithubProcessor",
            "url": "/user/orgs",
            "placeholder": "Select an organization",
            "validators": ["required"],
            "loadingMessage": "Loading Organizations",
            "conditional": {
                "listen": "login",
                "operator": "truthy",
                "transition": "rollUp"
            }
        },
        "repositories": {
            "type": "ProcessorSelect",
            "processor": "GithubProcessor",
            "url": "/orgs/{organization}/repos",
            "placeholder": "Select a Repo"
        },
        "members": {
            "type": "ProcessorSelect",
            "processor": "GithubProcessor",
            "url": "/orgs/{organization}/members",
            "placeholder": "Select a member"
        }
    },
    "fieldsets": [
        {
            "legend": "Login and Select organization",
            "fields": "login, organization"
        },

        {
            "legend": "Github Info for \"{organization}\"",
            "template": "ExpressionLegendTemplate",
            "conditional": {
                "listen": "organization",
                "operator": "truthy",
                "transition": "rollUp"
            },
            fields: ["repositories", "members"]
        }
    ]
};


export default class App extends Component {
    render() {
        return <Form schema={schema} loader={loader} valueManager={valueManager}/>
    }
}