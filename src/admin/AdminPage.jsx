import React from 'react';
import './AdminPage.css';
import { USER_ID } from '../constants';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants'
import { getUser, getAllUser, deleteUser } from '../util/APIutil';
import { Loading } from '../components/Loading';
import { MainPage } from './MainPage';
import { FormUser } from './FormUser';
import { AlertList } from 'react-bs-notifier';

class AdminPage extends React.Component {

    emptyUser = {
        name: '',
        email: '',
        role: '',
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listUser: [],
            showModal: false,
            selectedUser: {},
            password: '',
            changeView: false,
            user: this.emptyUser,
            id: '',
            alerts: [],
            timeout: 3000,
            position: 'top-right',
        };

        this.validateEmail = (email) => {
            var atPos = email.indexOf("@");
            var dotPos = email.indexOf(".");
            if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
                return false;
            }
            return true;
        }

        this.changeView = async (e) => {
            let changeView = this.state.changeView;
            if (e.target.id) {
                let id = e.target.id;
                let promise = await getUser(id).then(response => {
                    let user = this.state.user;
                    user.name = response.name;
                    user.email = response.email;
                    user.role = response.role;
                    this.setState({
                        user: user,
                        id: id
                    })
                });
            }
            else {
                this.setState({
                    user: {}
                });
            }
            this.setState({ changeView: !changeView })
        }

        this.createAccount = async (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const dataJson = {};


            data.forEach((val, key) => {
                if (val !== "") {
                    let name = key.split('.');
                    if (name.length > 1) {
                        let last = name.pop();
                        name.reduce((prev, next) => {
                            return prev[next] = prev[next] || {};
                        }, dataJson)[last] = val;
                    } else {
                        dataJson[key] = val
                    }
                }
            });

            if (!this.validateEmail(dataJson.email)) {
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: 'danger',
                    headline: 'Perhatian!',
                    message: 'Email yang anda masukkan salah, mohon untuk ketik ulang email'
                };

                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                });
            }

            if (dataJson.password !== dataJson.repeatPassword) {
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: 'danger',
                    headline: 'Perhatian!',
                    message: 'Password baru yang dimasukkan tidak cocok, ketik ulang password baru'
                };

                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                });
            }

            else {
                this.setState({
                    loading: true,
                })
                await fetch(API_BASE_URL + "/api/auth/signup",
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                        },
                        body: JSON.stringify(dataJson)
                    })
                    .then(response => console.log(response))
                    .then(() => window.location.reload())
                    .catch((error) => {
                        const newAlert = {
                            
                        };
                    });
            }
        }

        this.handleSubmit = async (e) => {
            e.preventDefault();
            console.log(e.target.id);
            const data = new FormData(e.target);
            const dataJson = {};

            this.setState({
                loading: true,
            })
            data.forEach((val, key) => {
                if (val !== "") {
                    let name = key.split('.');
                    if (name.length > 1) {
                        let last = name.pop();
                        name.reduce((prev, next) => {
                            return prev[next] = prev[next] || {};
                        }, dataJson)[last] = val;
                    } else {
                        dataJson[key] = val
                    }
                }
            });

            console.log(dataJson);
            if (dataJson.newPassword !== dataJson.repeatNewPassword) {
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: 'danger',
                    headline: 'Warning!',
                    message: 'Password baru yang dimasukkan tidak cocok, ketik ulang password baru'
                };

                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                });
            }
            else {
                await fetch(API_BASE_URL + '/api/user/' + this.state.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    },
                    body: JSON.stringify(dataJson)
                });
            }
            this.setState({
                user: {},
                changeView: false
            });
            window.location.reload();
        }

        this.handleShow = (e) => {
            let selectedUser;
            let userSelectedId = e.target.id;
            for (let i = 0; i < this.state.listUser.length; i++) {
                if (this.state.listUser[i].id == userSelectedId) {
                    selectedUser = this.state.listUser[i];
                    break;
                }
            }
            this.setState({
                showModal: true,
                selectedUser: selectedUser
            });
        }

        this.handleChange = (e) => {
            this.setState({
                password: e.target.value
            })
        }

        this.handleInputChange = (e) => {

        }

        this.handleHide = () => {
            this.setState({
                showModal: false,
                selectedUser: {}
            });
        }

        this.loadAllUser = async () => {
            let promise;
            let arrayResponse = [];
            promise = await getAllUser().then(response => {
                if (response) {
                    arrayResponse = response;
                }
            });
            this.setState({
                loading: false,
                listUser: arrayResponse,
            });
        }

        this.submitDelete = async (e) => {
            e.preventDefault();
            this.setState({
                loading: true,
            });
            let requestBody = {
                idAdmin: localStorage.getItem(USER_ID),
                idUser: this.state.selectedUser.id,
                password: this.state.password
            };

            let promise = await deleteUser(requestBody).then(response => {
                this.loadAllUser();
            });
            this.setState({
                loading: false,
                selectedUser: {},
                showModal: false,
            })
        }
    }
    async componentDidMount() {
        this.loadAllUser();
    }

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;

        //cari index dari 'alert' yang ingin ditutup
        const idx = alerts.indexOf(alert);

        if (idx >= 0) {
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }

        //Update ulang error state agar tidak muncul secara terulang setelah error message ditutup
        this.setState({
            error: false
        })
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data . . ." />
            )
        }

        if (this.state.changeView) {
            return (
                <div>
                    <AlertList
                        position={this.state.position}
                        alerts={this.state.alerts}
                        timeout={this.state.timeout}
                        dismissTitle="Tutup"
                        onDismiss={this.onAlertDismissed.bind(this)}
                    >
                    </AlertList>
                    <FormUser onSubmit={this.handleSubmit} createAccount={this.createAccount} user={this.state.user} goBack={this.changeView}></FormUser>
                </div>
            )
        }
        return (
            <MainPage
                listUser={this.state.listUser} handleShow={this.handleShow} showModal={this.state.showModal}
                handleHide={this.handleHide} submitDelete={this.submitDelete} password={this.state.password}
                handleChange={this.handleChange} changeView={this.changeView} onClick={this.props.onClick}
            >
            </MainPage>
        )
    }
}

export default AdminPage;