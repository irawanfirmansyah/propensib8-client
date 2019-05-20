import React from "react";
import { KomplainRow } from "../components/Row";
import { Loading } from "../components/Loading";
import { TableContainer } from '../containers/TableContainer';
import backgroundlinear from '../img/backgroundlinear.png';
import background1 from '../img/background-1.png';
import arrow from '../img/arrow.png';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import { NavigationBar } from "../components/Navbar";
import { DetailPasien } from '../containers/DetailPasien';
import { Modal, Button } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { AlertList } from "react-bs-notifier";

export class OverviewKomplain extends React.Component {

    units = ['Dokter', 'Perawat', 'Radiologi', 'Laboratorium', 'Fasilitas Kamar',
        'Fisioterapi', 'Kasir Rawat Inap', 'Pendaftaran Rawat Inap', 'IGD', 'Farmasi',
        'Administrasi Rawat Jalan', 'Makanan', 'Kebersihan Kamar',
    ]

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listKomplainPasien: [],
            viewDetail: false,
            resolveDescription: '',
            idSurvei: '',
            showModal: false,
            alerts: [],
            timeout: 3000,
            viewHistory: false,
        };
        this.viewDetailPasien = this.viewDetailPasien.bind(this);
        this.goBack = this.goBack.bind(this);

        this.openModal = () => {
            this.setState({
                isOpen: true,
            })
        }

        this.handleChange = (e) => {
            this.setState({
                resolveDescription: e.target.value
            })
        }

        this.handleHide = () => {
            this.setState({
                showModal: false,
            })
        };

        this.closeModal = () => {
            this.setState({
                isOpen: false,
            })
        }

        this.handleShow = () => {
            if (this.state.resolveDescription.length === 0) {
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: 'danger',
                    headline: 'Perhatian!',
                    message: "Mohon untuk mengisi isian \"Tindak Lanjut\" terlebih dahulu"
                }
                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                })
            }
            else {
                console.log(this.state.resolveDescription.length);
                this.setState({
                    showModal: true,
                })
            }
        }

        this.resolveKomplain = async (e) => {
            e.preventDefault();
            console.log(this.state.idSurvei);
            this.setState({
                loading: true,
            })
            const data = {
                idSurvei: this.state.idSurvei,
                deskripsi: this.state.resolveDescription
            };
            await fetch(API_BASE_URL + "/survei/resolve", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                },
                body: JSON.stringify(data)
            })
            this.setState({
                idSurvei: '',
                deskripsi: '',
                viewDetail: false,
            })
            window.location.reload();
        }
    }

    viewDetailPasien(e) {
        console.log(e.target.id);
        e.preventDefault();
        this.setState({
            viewDetail: true,
            idSurvei: e.target.id
        })
    }

    goBack() {
        this.setState({
            viewDetail: false,
        })
    }

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert);

        if (idx >= 0) {
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    async componentDidMount() {
        await fetch(API_BASE_URL + "/komplain/all", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    listKomplainPasien: data
                })
            });
        this.setState({
            loading: false
        })
    }

    render() {
        console.log(this.state.listKomplainPasien)
        if (this.state.loading) {
            return <Loading msg="Fetching Data..." />;
        }

        if (this.state.viewDetail) {
            console.log(this.state.resolveDescription);
            let selectedComplaint, patientComplaints;
            for (let i = 0; i < this.state.listKomplainPasien.length; i++) {
                if (this.state.idSurvei === this.state.listKomplainPasien[i].idSurvei) {
                    selectedComplaint = this.state.listKomplainPasien[i];
                    patientComplaints = this.state.listKomplainPasien[i].listKomplain;
                    break;
                }
            }
            console.log(patientComplaints);
            return (
                <div>
                    <AlertList
                        position="top-right"
                        alerts={this.state.alerts}
                        timeout={this.state.timeout}
                        dismissTitle="Tutup"
                        onDismiss={this.onAlertDismissed.bind(this)}
                    />
                    <div>
                        <img className="cover" src={background1} alt="backgroundlinear" />
                    </div>
                    <NavigationBar onClick={this.props.onClick} />
                    <div className="container">
                        <DetailPasien item={selectedComplaint} />
                        <Tabs
                            id="controlled-tab"
                            activeKey={this.state.key1}
                            onSelect={key => this.setState({ key: key })}
                        >
                            {
                                patientComplaints.map(item => {
                                    return (
                                        <Tab key={item.id} eventKey={item.namaUnit} title={item.namaUnit}>
                                            <div className="konten-komplain">
                                                {item.deskripsi}
                                            </div>
                                        </Tab>
                                    )
                                })
                            }
                        </Tabs>
                        <br></br>
                        <Tabs
                            id="controlled-tab"
                            activeKey={this.state2}
                        >
                            <Tab eventKey="tindakLanjut" title="Tindak Lanjut">
                                <textarea className="konten-komplain-1" value={this.state.resolveDescription} onChange={this.handleChange} placeholder="Ketik tindak lanjut disini..."></textarea>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-yellow" onClick={this.goBack}>Kembali</button>
                                    <button className="btn btn-table" onClick={this.handleShow}>Selesaikan</button>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleHide} centered>
                        <Modal.Header closeButton>
                            <p className="modal-title">Konfirmasi tindak lanjut</p>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.handleHide}>Batal</Button>
                            <Button variant="primary" onClick={this.resolveKomplain}>Selesai</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <img className="background-1" src={backgroundlinear} alt="backgroundlinear" />
                </div>
                <NavigationBar onClick={this.props.onClick} />
                <div className="container">
                    <br></br>
                    <div className="d-flex justify-content-between align-items-center">
                        <img className="arrow-1" src={arrow} alt="arrow"
                            onClick={() => {
                                this.props.history.push('/overview');
                            }} />
                        <div className="title-table-2">Komplain belum terselesaikan</div>
                        <button className="btn btn-hist" onClick={this.openModal}>Riwayat</button>
                    </div>
                    <br></br>
                    <TableContainer header={["Nama", "Tanggal", "Rating", "Urgensi", "Tindakan"]}>
                        <KomplainRow listKomplain={this.state.listKomplainPasien} onClick={this.viewDetailPasien} />
                    </TableContainer>
                </div>
            </div>
        );
    }
}