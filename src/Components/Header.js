import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid brown',
        backgroundColor: 'sandybrown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            loggedInUserName: undefined,
            isLoggedIn: false
        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    responseGoogle = (response) => {
        localStorage.setItem('loggedInUserName', response.profileObj.name);
        this.setState({ loginModalIsOpen: false, isLoggedIn: true, loggedInUserName: response.profileObj.name })
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true })
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUserName: undefined })
    }

    render() {
        const { loginModalIsOpen, isLoggedIn } = this.state;
        const loggedInUserName = localStorage.getItem('loggedInUserName');
        return (
            <div>
                <div className="header">
                    <div className="header-logo" onClick={this.handleNavigate}>
                        <b>e!</b>
                    </div>
                    {isLoggedIn ? <div style={{ display: 'inline-block' }}>
                        <span className="loggedInUserName">{loggedInUserName}</span>
                        <span class="login" onClick={this.handleLogout}>Logout</span>
                    </div> :
                        <div className="login" onClick={this.handleLogin}>Login</div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <FacebookLogin
                            appId="235368551459966"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.responseFacebook} />
                        <GoogleLogin
                            clientId="403225907200-b4641ldulrfhs9ak2dpvijq0eae2cuc4.apps.googleusercontent.com"
                            buttonText="Login with Gmail"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
            </div >
        )
    }
}

export default withRouter(Header);