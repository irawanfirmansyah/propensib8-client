import React from 'react';
import { Loading } from '../components/Loading';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import { NavigationBar } from '../components/Navbar';
import backgroundlinear from '../img/backgroundlinear.png';

const cardStyle = {
    maxWidth: "18rem;",
    borderColor: "background: linear-gradient(82.01deg, #30C5FF 0%, #655DC5 98.9%);"
};

export class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            jmlhSurvei: '',
            persentaseKepuasan: '',
            jmlhKomplain: '',
            rating: '',
            unitTerbaik: '',
            persentaseHighter: false,
            komplainHigher: false,
            jmlhKomplainLalu: '',
            persentaseKepuasanLalu: '',
            listKomplain: [],
            listReview: [],
            data: {},
            changeView: true
        }
    }

    componentDidMount() {
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
        today = yyyy + mm + dd;
        var startDate = yyyy + mm + '01';
        console.log(startDate);
        console.log(today);
        console.log(localStorage.getItem(ACCESS_TOKEN));
        var url = new URL('http://localhost:2016/dashboard/'), params = { tipeSurvei: 'total', bulanTahunStart: startDate, bulanTahunEnd: today };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        console.log(url.href);
        fetch(url.href, {
            method: 'GET',
            headers: {
                Accept: "*/*",
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTU3OTk2NDU1LCJleHAiOjE1NTg2MDEyNTV9.00eQWcwmFS4hmMN59hHCpYTLF5f_gGs6sr4fMFeFsbnkvkbmmlvJHVpGiyX5H90a4ymvMPYd6WiPy4edZctPFQ",
                "Cache-Control": "no-cache",
            }
        }).then(response => response.json())
            .then((data) => {
                this.setState({
                    jmlhSurvei : data.jmlhSurvei,
                    
                })
            })
            .catch(() => {
                this.setState({
                    loading : false,
                })
            })


        this.setState({
            loading: false,
            changeView: true
        });
    }

    async handleClick(e) {
        e.preventDevfault();

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
                    <div>
                        <img className="background-dashboard" src={backgroundlinear} alt="backgroundlinear" />
                    </div>
                    <NavigationBar onClick={this.props.onClick} />
                    <br></br>
                    <div className="container dashboard">
                        <br></br>
                        <h5 className="header5-dashboard">Performa Keseluruhan</h5>
                        <div className="d-flex justify-content-around">
                            <div className="card text-center">
                                <div className="card-header">Survei</div>
                                <div className="card-body">
                                    <p className="p-card">2134</p>
                                </div>
                            </div>
                            <div className="card text-center">
                                <div className="card-header">Presentase Kepuasan</div>
                                <div className="card-body">
                                    <p className="p-card">10%</p>
                                </div>
                            </div>
                            <div className="card text-center">
                                <div className="card-header">Komplain Pasien</div>
                                <div className="card-body">
                                    <p className="p-card">12</p>
                                </div>
                            </div>
                            <div className="card text-center">
                                <div className="card-header">Rating</div>
                                <div className="card-body">
                                    <p className="p-card">3/5</p>
                                </div>
                            </div>
                            <div className="card text-center">
                                <div className="card-header">Perfoma Terbaik</div>
                                <div className="card-body">
                                    <p className="p-card">...</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <h5 className="header5-dashboard">Perbandingan bulan sebelumnya</h5>
                        <div className="row">
                            <div className="col-5">
                                <div className="d-flex justify-content-around">
                                    <div className="card text-center">
                                        <div className="card-header">Persentase Kepuasan</div>
                                        <div className="card-body">
                                            <p className="p-card">...</p>
                                        </div>
                                    </div>
                                    <div className="card text-center">
                                        <div className="card-header">Komplain Pasien</div>
                                        <div className="card-body">
                                            <p className="p-card">...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="card text-center">
                                    <div className="card-header">Komplain Unit Terbanyak</div>
                                    <div className="card-body">
                                        <p className="p-card">...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        </br>
                        <h5 className="header5-dashboard">Review Pasien</h5>
                        <div className="row last">
                            <div className="col-6">
                                <div className="card text-center">
                                    <div className="card-header">Komplain Pasien</div>
                                    <div className="card-body">
                                        <p className="p-card">...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card text-center">
                                    <div className="card-header">Review Pasien</div>
                                    <div className="card-body">
                                        <p className="p-card">...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
            )
        }
    }
}