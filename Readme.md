subschema-github
===
*In Development*
This project is meant to implement github oauth so that subschema-demo can 
initialize and create github repos from projects.  
 
Contributions welcome.
##Notes
auth server =>https://auth-server.herokuapp.com/
github hellojs demo = http://adodson.com/hello.js/demos/github.html

##Demo
See it in action [here](https://subschema.github.io/subschema-github/)

Or run it 

```sh
  git clone 
  cd subschema-github
  npm install
  npm run hot &
  open http://localhost:8082
```

##Installation
```sh
 $ npm install subschema-github
``

##Usage
```jsx

 import React, {Component} from 'react';
 import Subschema, {loader, Form} from 'Subschema';
 import subschemaGithub, {github} from 'subschema-github';
 
 //setup hellojs for github.
 You can go to https://auth-server.herokuapp.com/#signin to get a proxy.

 github.settings.hello = {
        hello:{
            'subschema.github.io': {github: '5123a-your-app-key'}
        },
        network: {
            oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
            redirect_url:'/subschema-github/redirect.html'
        }
 }
 
 loader.addLoader(subschemaGithub);
 
 //A simple Schema for this demo.
 
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
         return <div>
             <Form schema={schema}/>
         </div>
     }
 }


  
```