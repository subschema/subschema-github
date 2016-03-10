"use strict";
import React, {Component} from 'react';
import PropTypes from 'subschema-prop-types';
import github, {isAuth} from './github';

const icon = <i className="fa fa-github"/>;

export default class Login extends Component {

    static defaultProps = {
        buttonClass: "btn btn-primary",
        loginText: 'Github Login',
        logoutText: 'Github Logout',
        imgClass: "thumbnail"
    };

    static propTypes = {
        onChange: PropTypes.valueEvent,
        login: PropTypes.value,
        style: PropTypes.style
    };

    handleChange(me) {
        if (typeof this.props.onChange === 'function') {
            console.log('handleChange', me);
            this.props.onChange(me);
        }
    };


    profile = ()=> {
        return github().api({path: 'me', formatResponse: false}).then(this.handleGithubLoginSuccess);
    };

    handleClick = (e)=> {
        this.setState({inprogress: true});
        github().login({scope: 'read:org, friends, photos, publish'}).then(this.profile, this.handleGithubLoginFailure)
    };
    handleGithubLoginSuccess = (me)=> {
        console.log('success->me', me);
        this.setState({inprogress: false, error: false});
        this.handleChange(me);
    };
    handleGithubLoginFailure = (error)=> {
        console.log('fail->me', error);
        this.setState({inprogress: false, error});
        this.handleChange(null);
    };

    state = {
        inprogress: false
    };


    componentDidMount() {

        if (!this.props.login) {
            const me = isAuth();
            if (me && me.error) {
                this.setState({error: me.error, inprogress: false});
            } else {
                this.profile();
            }
        }

    }

    handleLogout = (e)=> {
        github().logout();
        this.props.onChange(null);
        this.setState({error: false, inprogress: false});
    };

    renderMe() {
        const {login:{avatar_url='', login, name},labelClass, nameClass, loginClass, imgClass} = this.props;
        return (<button onClick={this.handleLogout} className={`clearfix ${loginClass}`}>
            <img className={imgClass} src={avatar_url}/>
            <strong className={labelClass}>{icon} {login}</strong>
            <span className={nameClass}>{name}</span>
        </button>);
    }

    renderLogin() {
        return <button className={this.props.buttonClass} onClick={this.handleClick}><i
            className="fa fa-github"/> {this.props.loginText}</button>;
    }

    render() {
        if (this.state.inprogress) {
            return <span className={this.props.inprogressClass}>{icon} Logging Into Github...</span>
        }
        if (this.state.error) {
            return <div className={this.props.hasErrorClass}>
                {this.renderLogin()}
                <div className={this.props.errorMessageClass}>{this.state.error.message}</div>
            </div>
        }
        return this.props.login ? this.renderMe() : this.renderLogin();

    }
}