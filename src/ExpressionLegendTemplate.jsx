"use strict";

import React, {Component} from 'react';
import PropTypes from 'subschema-prop-types';

export default class ExpressionLegendTemplate extends Component {
    static propTypes = {
        legend: PropTypes.expression,
        className: PropTypes.cssClass,
        field: PropTypes.any
    };

    render() {
        const {legend, legendClass, buttons, className, ...rest} =  {...this.props.field, ...this.props};

        return <fieldset className={className}>
            <legend className={legendClass}>{legend}</legend>
            {this.props.children}
            {buttons}
        </fieldset>

    }

}