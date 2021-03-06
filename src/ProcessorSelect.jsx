"use strict";

import React, {Component} from 'react';
import PropTypes from 'subschema-prop-types';

export default class ProcessorSelect extends Component {


    static propTypes = {
        url: PropTypes.expression,
        processor: PropTypes.processor,
        placeholder: PropTypes.string,
        loadingMessage: PropTypes.string,
        onChange: PropTypes.valueEvent,
        clearOnDataChange: PropTypes.bool,
        Select: PropTypes.type

    };
    static defaultProps = {
        loadingMessage: 'Loading...',
        clearOnDataChange: true,
        Select: 'Select'
    };

    state = {
        options: [],
        loading: this.props.loadingMessage
    };

    componentDidMount() {
        this.fetch(this.props)

    }

    fetch(props) {
        if (props.clearOnDataChange) {
            this.props.onChange(null);
        }
        this.props.processor.fetch(props.url, null, this, this._handleResponse);
    }

    componentWillReceiveProps(props) {
        if (this.props.url != props.url) {
            this.fetch(props);
        }
    }

    _handleResponse = (err, data)=> {
        const {processor:{value,format}, placeholder} = this.props;
        const options = data.map((d)=> {
            return {
                val: value(d),
                label: format(d)
            }
        });
        this.setState({loading: placeholder, options});
    };

    render() {
        const {Select, url, processor, loadingMessage, placeholder, ...props} = this.props;
        return <Select options={this.state.options} placeholder={this.state.loading} {...props}/>
    }


}