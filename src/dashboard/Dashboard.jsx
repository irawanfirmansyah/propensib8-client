import React from 'react';
import { Loading } from '../components/Loading';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
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
            response: {},
        }
    }

    componentDidMount() {
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
        today = yyyy+'-'+mm+'-'+dd;
        var startDate = yyyy+'-'+mm+'-01';
        console.log(startDate);
        console.log(today);
        console.log(localStorage.getItem(ACCESS_TOKEN));
        var url = new URL(API_BASE_URL+'/dashboard/'), params = { tipeSurvei: 'total', bulanTahunStart: startDate, bulanTahunEnd: today };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(response => {
            console.log(response);
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data . . ." />
            )
        }
    }
}