"use strict";
import gh, {isAuth} from './github';

//Keep a cache of component to data.
let map = new WeakMap();


function filter(orgs, value, cb) {
    let result = orgs;
    if (value) {
        const re = new RegExp(value, 'i');
        result = orgs.filter(v => re.test(v.name || v.full_name));
    }
    cb(null, result);
}

const api = {
    fetch(url, value, component, cb) {
        //url/component based cache;
        const data = map.get(component);
        if (!data || data.url != url) {
            gh().api(url).then(function (resp) {
                resp.url = url;
                map.set(component, resp);
                filter(resp.data, value, cb);
            });
        } else {
            filter(data.data, value, cb);
        }
    },
    /**Value returns the value of the object, not necessarily whats in the input box**/
    value(obj){
        return obj == null ? null : obj.name || obj.full_name || obj;
    },
    /**
     * Format returns the format.
     * @param v
     * @returns {null}
     */
    format(v){
        return v == null ? null : v.name || v.full_name || v;
    }
};

export default api;