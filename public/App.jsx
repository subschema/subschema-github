"use strict";
import React, {Component} from "react";
import Subschema,{Form, loader, valueManager, loaderFactory} from "Subschema";
import hello from 'hellojs';
import Login from './Login.jsx';
var schema = {
    "schema": {
        "title": {
            "type": "Select",
            "options": [
                "Mr",
                "Mrs",
                "Ms"
            ]
        },
        "name": {
            "type": "Text",
            "validators": [
                "required"
            ]
        },
        "age": {
            "type": "Number"
        }
    },
    "fieldsets": [
        {
            "legend": "Name",
            "fields": "title, name, age",
            "buttons": [
                {
                    "label": "Cancel",
                    "action": "cancel",
                    "buttonClass": "btn"
                },
                {
                    "label": "Submit",
                    "action": "submit",
                    "buttonClass": "btn btn-primary"
                }
            ]
        }
    ]
};
var value = {};


export default class App extends Component {
    render() {
        return <div>
            <h3>subschema-github</h3>
            <p></p>
            <Login/>
            <Form schema={schema} value={value}/>;
        </div>
    }
}