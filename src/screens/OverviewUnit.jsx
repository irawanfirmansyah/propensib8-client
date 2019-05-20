import React from 'react';
import { NavigationBar } from '../components/Navbar';
import background1 from '../img/background-1.png';
import background2 from '../img/backgroundlinear.png';
import { Loading } from '../components/Loading';
import arrow from '../img/arrow.png';
import { TableContainer } from '../containers/TableContainer';
import { OverviewUnitRow } from '../components/OverviewUnitRow';
import { ContainerUnit } from '../containers/ContainerUnit';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CustomTable from '../components/Table';
import { CustomRow } from '../components/Row';

export class OverviewUnit extends React.Component {

    units = ['Dokter', 'Perawat', 'Radiologi', 'Laboratorium', 'Fasilitas Kamar',
        'Fisioterapi', 'Kasir Rawat Inap', 'Pendaftaran Rawat Inap', 'IGD', 'Farmasi',
        'Administrasi Rawat Jalan', 'Makanan', 'Kebersihan Kamar',
    ]

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            listOverviewUnit: [],
            viewUnit: false,
            viewHistory: false,
            currUnit: '',
            data: {},
            listHistory: [],
            listKomplain: [],
            listReview: [],
            key: 'review',
            pickedDate: '',
            currDate: [],
            startDate: '',
            endDate: '',
            activeType: 'total',
            solvedByHRMarketing: 0,
            solvedByMarketing: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.datePicker = this.datePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.changeType = this.changeType.bind(this);

        this.getCurrUnit = () => {
            const objUnit = {};
            for (let i = 0; i < this.state.listOverviewUnit.length; i++) {
                if (this.state.currUnit === this.state.listOverviewUnit[i].namaUnit) {
                    Object.assign(objUnit, this.state.listOverviewUnit[i]);
                    return objUnit;
                }
            }
        }

        this.loadDetailPerforma = async (namaUnit, tipeSurvei) => {
            let type = tipeSurvei, array;
            array = type.split(" ");
            if (array.length > 1) {
                type = array[0] + '%20' + array[1]
            }
            this.setState({
                loading: true,
                listKomplain: [],
                listReview: [],
            });
            await fetch(API_BASE_URL + "/unit-parameter/detail-performa/" + namaUnit + "/" + tipeSurvei + "?bulanTahunStart=" + this.state.startDate + "&bulanTahunEnd=" + this.state.endDate,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                }
            )
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        data: data,
                        listKomplain: data.komplainRest,
                        listReview: data.reviewRest,
                        solvedByHRMarketing: data.komplainSolvedByHRMarketing,
                        solvedByMarketing: data.komplainSolved
                    })
                })

            this.setState({
                loading: false
            });
        }

        this.loadHistory = async () => {
            this.setState({
                loading: true
            });
            let data;

            await fetch(API_BASE_URL + '/unit-parameter/riwayat-performa',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                })
                .then((response) => {
                    response.json();
                })
                .then(result => data = result);
            if(data){
                this.setState({
                    listHistory: data
                });
            }
            this.setState({
                loading: false,
            })
        }
    }

    changeType(e) {
        e.preventDefault();
        let id = e.target.id;
        this.loadDetailPerforma(this.state.currUnit, id);

        let activeClassName = document.getElementById(this.state.activeType).className;
        let className = document.getElementById(id).className;

        document.getElementById(this.state.activeType).className = className;
        document.getElementById(id).className = activeClassName;

        this.setState({
            activeType: id
        });
    }

    handleChange(e) {
        this.setState({
            pickedDate: e.target.value
        });
    }

    goBack() {
        this.setState({
            viewUnit: false,
        })
    }

    async datePicker(e) {
        e.preventDefault();
        var listMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustur", "September", "Oktober", "November", "Desember"];
        let arrayOfObj = [], month, year;
        let firstDay = this.state.pickedDate + '-01';
        let today = firstDay.split('-');

        month = listMonth[parseInt(today[1]) - 1];
        year = today[0];

        this.setState({
            currDate: month + ' ' + year
        });

        var yyyy, mm, dd;
        var lastDay = new Date(parseInt(today[0]), parseInt(today[1]), 0);
        dd = lastDay.getDate()
        mm = lastDay.getMonth() + 1;
        yyyy = lastDay.getFullYear();
        if (mm < 10) { mm = '0' + mm }
        lastDay = yyyy + '-' + mm + '-' + dd;
        for (let i = 0; i < this.units.length; i++) {
            let resObj;
            await fetch(API_BASE_URL + "/unit-parameter/performa/" + this.units[i] + "/total?bulanTahunStart=" + firstDay + "&bulanTahunEnd=" + lastDay,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                }
            )
                .then(response => response.json())
                .then((data) => resObj = data);
            arrayOfObj.push(resObj);
        }

        this.setState({
            loading: false,
            listOverviewUnit: arrayOfObj,
            startDate: firstDay,
            endDate: lastDay,
        });
    }

    async componentDidMount() {
        let arrayOfObj = [];
        var listMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustur", "September", "Oktober", "November", "Desember"];

        var today = new Date();
        this.setState({
            currDate: listMonth[today.getMonth()] + ' ' + today.getFullYear()
        });
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
        today = yyyy + '-' + mm + '-' + dd;
        var firstDay = yyyy + '-' + mm + '-01';

        for (let i = 0; i < this.units.length; i++) {
            let resObj;
            await fetch(API_BASE_URL + "/unit-parameter/performa/" + this.units[i] + "/total?bulanTahunStart=" + firstDay + "&bulanTahunEnd=" + today,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                })
                .then(response => response.json())
                .then((data) => {
                    resObj = data
                });
            arrayOfObj.push(resObj);
        }

        this.setState({
            loading: false,
            listOverviewUnit: arrayOfObj,
            startDate: firstDay,
            endDate: today
        });
    }

    handleClick(e) {
        e.preventDefault();
        let namaUnit = e.target.id;

        this.setState({
            currUnit: namaUnit
        });
        this.loadDetailPerforma(namaUnit, this.state.activeType);
        this.setState({
            viewUnit: true,
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data . . ." />
            )
        }

        if (this.state.viewUnit) {

            let currUnit = this.getCurrUnit();
            return (
                <div>
                    <div>
                        <img className="cover" src={background1} alt="background1"></img>
                    </div>
                    <NavigationBar onClick={this.props.onClick} />
                    <ContainerUnit unit={currUnit} goBack={this.goBack} changeType={this.changeType} type={this.state.activeType} solvedByHRMarketing={this.state.solvedByHRMarketing} solvedByMarketing={this.state.solvedByMarketing}>
                        <Tabs
                            id="controlled-tab"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key: key })}
                        >
                            <Tab eventKey="review" title="Review">
                                <CustomTable header={['Pasien', 'Tanggal Isi', 'Review', 'Rating']}>
                                    <CustomRow listReview={this.state.listReview}></CustomRow>
                                </CustomTable>
                            </Tab>
                            <Tab eventKey="komplain" title="Komplain">
                                <CustomTable header={['Pasien', 'Tanggal Isi', 'Komplain', 'Rating', 'Tindakan']}>
                                    <CustomRow listKomplain={this.state.listKomplain}></CustomRow>
                                </CustomTable>
                            </Tab>
                        </Tabs>
                    </ContainerUnit>
                </div>
            )
        }
        if (this.state.viewHistory) {

        }

        return (
            <div>
                <div>
                    <img className="cover" src={background2} alt="background"></img>
                </div>
                <NavigationBar />
                <div className="container">
                    <br></br>
                    <div className="d-flex align-items-center">
                        <div className="mr-auto p-2 d-flex align-items-center">
                            <img className="arrow-1" src={arrow} alt="arrow"
                                onClick={() => {
                                    this.props.history.push('/overview')
                                }}
                            />
                            <div className="title-table-1">Performa Unit - {this.state.currDate}</div>
                        </div>
                        <form onSubmit={this.datePicker} style={{ marginRight: '50px' }}>
                            <p className="date-label">Pilih bulan dan tahun :</p>
                            <div className="input-group mb-3">
                                <input className="form-control" type="month" onChange={this.handleChange}></input>
                                <div className="input-group-append">
                                    <button className="btn btn-light" type="submit">Pilih</button>
                                </div>
                            </div>
                        </form>
                        <button className="btn btn-hist" onClick={this.loadHistory}>Riwayat</button>
                    </div>
                    <br></br>
                    <div className="table-05">
                        <TableContainer title="Overview Dokter" header={['Unit', 'Jumlah Review', 'Jumlah Komplain', 'Detail']}>
                            <OverviewUnitRow listUnit={this.state.listOverviewUnit} onClick={this.handleClick} />
                        </TableContainer>
                    </div>
                </div>
            </div>
        )
    }
}