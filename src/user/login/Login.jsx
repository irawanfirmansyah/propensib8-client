import React from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import background from '../../img/background-login.png';
import { ACCESS_TOKEN, USER_ROLE, USER_ID, API_BASE_URL } from '../../constants';
import axios from 'axios';
import { Loading } from '../../components/Loading';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            isError: false,
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault()
        if (e.target.id === 'password') {
            this.setState({
                password: e.target.value
            })
        }
        else {
            this.setState({
                usernameOrEmail: e.target.value
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault()
        let token, role,id ;

        const user = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        };
        this.setState({
            isLoading: true
        })
        await axios.post(API_BASE_URL+"/api/auth/signin", user)
            .then(res => {
                token = res.data.accessToken;
                role = res.data.roles[0].name;
                id = res.data.id;
                localStorage.setItem(ACCESS_TOKEN, token);
                localStorage.setItem(USER_ROLE, role);
                localStorage.setItem(USER_ID,id);
                this.setState({
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({
                    isError: true,
                    isLoading: false
                })
            });

        if (token) {

        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loading msg="Loading ..."></Loading>
        }

        let token = localStorage.getItem(ACCESS_TOKEN);
        const route = {
            'ROLE_USER':'/',
            'ROLE_ADMIN':'/admin',
            'ROLE_CS':'/overview',
            'ROLE_TOP_MANAGER':'/dashboard',
            'ROLE_EXECUTIVE':'/dashboard',
        }
        if (token) {
            if(localStorage.getItem(USER_ROLE)){

            }
            return <Redirect to={route[localStorage.getItem(USER_ROLE)]}></Redirect>
        }
        return (
            <div>
                <div>
                    <img className="background-1" src={background} alt="background"></img>
                </div>
                <div className="container login">
                    <h1 className="login-title">Survey Pelayanan Mitra Keluarga</h1>
                    <div className="row justify-content-end">
                        <aside className="col-sm-4">
                            <div className="card">
                                <article className="card-body">
                                    <br></br>
                                    <form onSubmit={this.handleSubmit}>
                                        <h4 className="card-title text-center mb-4 mt-1 form-title">Masuk ke akun Anda</h4>
                                        {this.state.isError ? <p className="font-danger">*Username atau password yang Anda masukkan salah</p> : null}
                                        <div className="form-group">
                                            <label>Username</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control-login input-login" id="usernameOrEmail" onChange={this.handleChange} defaultValue={this.state.usernameOrEmail} placeholder="Masukkan username/email anda" />
                                            </div>
                                        </div>{/** form-group username/email */}
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="input-group">
                                                <input type="password" className="form-control-login input-login" id="password" onChange={this.handleChange} defaultValue={this.state.password} placeholder="Masukkan password anda" />
                                            </div>
                                        </div>{/** form-group password */}
                                        <br></br>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-form btn-block">Masuk</button>
                                        </div>{/** form-group button */}
                                    </form>
                                </article>{/** card-body */}
                            </div> {/** card */}
                        </aside> {/** aside col-sm-4 */}
                    </div>{/** row */}
                </div>{/** container login*/}
            </div>
        )
    }
}

export default LoginForm;