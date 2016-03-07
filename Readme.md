subschema-github
===


##Demo
See it in action [here]()

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
 import subschema-github from 'subschema-github';
 
 loader.addLoader(subschema-github);
 
 //A simple Schema for this demo.
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
}
 
 export default class App extends Component {
 
     render() {
         return <div>
             <h3></h3>
             <Form schema={schema}/>
         </div>
     }
 }


  
```