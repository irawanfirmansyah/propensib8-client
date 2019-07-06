import React from 'react';
import { FormDataPasien } from '../containers/FormDataPasien';
import { FormSurvei } from '../containers/FormSurvei';
import background1 from '../img/background-1.png';
import background2 from '../img/background-2.png';
import { AlertList } from 'react-bs-notifier';
import { Loading } from '../components/Loading';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import swal from 'sweetalert';

class SurveiPasien extends React.Component {

    emptyItem = {
        id: '',
        idMedrec: '',
        nik: '',
        nama: '',
        alamat: '',
        tanggalLahir: '',
        tempatLahir: '',
        jenisKelamin: '',
        nomorHp: '',
        nomorTelepon: '',
    }

    emptyItem1 = {
        rating: 0,
        jenisSurvei: '',
        pasien: '',
        tanggal: '',
    }


    constructor(props) {
        super(props)
        this.state = {
            pasienObj: this.emptyItem,
            noMedrec: '',
            error: false,
            position: 'top-right',
            alerts: [],
            timeout: 3000,
            alertMsg: '',
            changeForm: false,
            loading: false,
            rating: 0,
            jenisSurvei: '',
            feedBack: '',
            selectedUnits: [],
            selectedUnitComplaint: [],
            selectedUnitParameters: [],
            notif: '',
            showNotif: false,
        };
        this.handleBlurInput = this.handleBlurInput.bind(this);
        this.handlePatientSubmit = this.handlePatientSubmit.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.secondHandleChange = this.secondHandleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSecondClick = this.handleSecondClick.bind(this);
        this.refCallBack = this.refCallBack.bind(this);

        this.notification = (notification) => {
            this.setState({
                notif: notification
            });

            setTimeout(() => {
                this.setState({
                    showNotif: true
                });
            }, 3000);

            this.setState({
                showNotif: false
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    //mount data tipe survei ke state
    componentDidMount() {
        //check apakah data tipe survei berhasil dikirim
        let data;
        try {
            data = this.props.location.state.tipeSurvei;
        }
        //jika error, redirect ke Home('/')
        catch (error) {
            return <Redirect to='/' />
        }
        this.setState({
            loading: false,
            jenisSurvei: data,
        });
    }

    //update medrec yang diberikan dari input ke state
    handleBlurInput(event) {
        event.preventDefault()
        const medrec = event.target.value;
        if (event.target.name === 'nama') {
            if (medrec !== this.state.medrec) {
                this.setState({
                    noMedrec: medrec
                });
            }
        }

        else {
            const newSelectedUnitComplaint = this.state.selectedUnitComplaint;
            let complaintUnit = {};
            for (let i = 0; i < newSelectedUnitComplaint.length; i++) {
                let currUnitName = event.target.id.slice(4);
                if (newSelectedUnitComplaint[i]['namaUnit'] === currUnitName) {
                    complaintUnit = newSelectedUnitComplaint[i]
                    complaintUnit['deskripsi'] = event.target.value;
                    break;
                }
            }
            this.setState({
                selectedUnitComplaint: newSelectedUnitComplaint
            });
        }
    }

    //submit form data pasien
    //jika memenuhi kondisi, state changeForm berubah true (render form survei)
    handlePatientSubmit(event) {
        event.preventDefault();
        if (this.state.pasienObj !== this.emptyItem) {
            var vals = Object.values(this.state.pasienObj)
            var i;
            let change;

            //check apakah state pasien sudah terisi semua
            //jika ada kosong 1, return false
            for (i = 0; i < vals.length; i++) {
                if (vals[i] === '') {
                    change = false;
                    break;
                }
                change = true;
            }
            this.setState({
                changeForm: change
            });
        }
    }

    //update state data survei sesuai input dari form survei
    handleChange(value) {
        this.setState({
            rating: value
        });
        if (value <= 3 && value > 0) {

        }
    }

    secondHandleChange(event) {
        this.setState({
            feedBack: event.target.value
        });
    }

    //method utuk post form survei ke API
    async handlePostSubmit(event) {
        event.preventDefault();

        //get current Date
        var today = new Date();
        var dd = today.getDate()
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
        today = yyyy + mm + dd;
        if (this.state.rating > 3) {
            const data = {
                tanggal: today,
                rating: this.state.rating,
                jenisSurvei: this.state.jenisSurvei,
                idPasien: this.state.pasienObj.id,
                feedback: this.state.feedBack,
            };

            let surveiResponse;
            this.setState({
                loading: true
            });

            //post survei model
            await fetch(API_BASE_URL + "/survei/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json()
                    .then((value) => {
                        surveiResponse = value.result
                        swal("Berhasil!", "Terima kasih sudah ingin mengisi survei", "success")
                    }));
            //kalau unit terpilih, jalankan method post data Review
            if (this.state.selectedUnits.length > 0) {
                let units = this.state.selectedUnits;
                for (let i = 0; i < units.length; i++) {

                    const dataReview = {
                        deskripsi: this.state.feedBack,
                        namaUnit: units[i],
                        idSurvei: surveiResponse.id,
                        tanggal: today
                    };

                    let reviewResponse;
                    //loop fetch
                    await fetch(API_BASE_URL + "/review/add", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                        },
                        body: JSON.stringify(dataReview)
                    })
                        .then(response => response.json()
                            .then((value) => {
                                reviewResponse = value.result
                            }));
                }
            }

            this.setState({
                loading: false
            });
            this.props.history.push("/");
        }

        else if (this.state.rating <= 3 && this.state.rating > 0) {

            if (this.state.selectedUnitParameters.length > 0) {
                const data = {
                    tanggal: today,
                    rating: this.state.rating,
                    jenisSurvei: this.state.jenisSurvei,
                    idPasien: this.state.pasienObj.id,
                    feedback: this.state.feedBack,
                };

                let surveiResponse;
                this.setState({
                    loading: true
                });

                //post survei model
                await fetch(API_BASE_URL + "/survei/add", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)

                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json()
                        .then((value) => {
                            surveiResponse = value.result
                            swal("Berhasil!", "Terima kasih sudah ingin mengisi survei", "success")
                        }));


                //post list complaint ke backend
                if (this.state.selectedUnitComplaint.length > 0) {

                    let complaints = this.state.selectedUnitComplaint;

                    for (let i = 0; i < complaints.length; i++) {
                        const dataComplaint = {
                            deskripsi: complaints[i].deskripsi,
                            namaUnit: complaints[i].namaUnit,
                            result: '',
                            idSurvei: surveiResponse.id,
                            tanggal: today
                        };

                        let complaintResponse;

                        await fetch(API_BASE_URL + "/komplain/add", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                            },
                            body: JSON.stringify(dataComplaint)
                        })
                            .then(response => response.json()
                                .then((value) => {
                                    complaintResponse = value.result
                                }));
                    }
                }

                if (this.state.selectedUnitParameters.length > 0) {
                    let unitParams = this.state.selectedUnitParameters;
                    for (let i = 0; i < unitParams.length; i++) {
                        const dataUnitParam = {
                            unit: unitParams[i].unit,
                            parameter: unitParams[i].parameter,
                        };

                        let unitParamResponse;

                        await fetch(API_BASE_URL + "/unit-parameter/add", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                            },
                            body: JSON.stringify(dataUnitParam)
                        })
                            .then(response => response.json()
                                .then((value) => {
                                    unitParamResponse = value.result
                                }));
                    }
                }

                this.setState({
                    loading: false
                });
                this.props.history.push("/");
            }
            else {
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: 'danger',
                    headline: 'Perhatian!',
                    message: 'Mohon untuk melengkapi isian/pilihan form.'
                };

                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                });
            }
        }
    }

    //method menampilkan notifikasi error jika nomor medrec salah/tidak sesuai
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

    //componenDidUpdate akan mengupdate state data pasien
    componentDidUpdate(prevProps, prevState) {

        //check prevState dan currState agar tidak terjadi loop lifecycle method
        if (prevState.noMedrec !== this.state.noMedrec) {

            this.setState({
                loading: true
            });

            fetch(API_BASE_URL + "/pasien/" + this.state.noMedrec,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                })
                .then(response => response.json())
                .then((data) => this.setState({ pasienObj: data }))
                .catch(error => this.setState({ pasienObj: this.emptyItem, error: true }));

            this.setState({
                loading: false
            });


        }
        //update state error kalau fetch data gagal untuk menampilkan AlertList
        else if (this.state.error && this.state.alerts.length === prevState.alerts.length) {
            const newAlert = {
                id: (new Date()).getTime(),
                type: 'danger',
                headline: 'Perhatian!',
                message: 'Nomor Medrec yang anda masukkan tidak dapat ditemukkan.'
            };

            this.setState({
                alerts: [...this.state.alerts, newAlert]
            });
        }
    }

    //handle click untuk unit
    handleClick(e) {
        e.preventDefault();
        let id = e.target.id;
        let className = document.getElementById(id).className;
        let arr = [];
        let res;
        arr = className.split(' ');

        //deactivate button
        if (arr.includes('transform-active')) {
            arr.pop();
            res = arr.join(' ');
            document.getElementById(id).className = res;

            if (this.state.rating > 3) {
                const array = this.state.selectedUnits.filter(function (value) {
                    return value !== id;
                });
                this.setState({
                    selectedUnits: array
                });
            }
            else if (this.state.rating <= 3 && this.state.rating > 0) {
                const array1 = this.state.selectedUnits.filter(function (value) {
                    return value !== id;
                });
                const array2 = this.state.selectedUnitComplaint.filter(function (item) {
                    return item['namaUnit'] !== id;
                });

                this.setState({
                    selectedUnits: array1,
                    selectedUnitComplaint: array2
                })

            }
        }
        //activating button
        else {
            document.getElementById(id).className = className + ' transform-active';
            if (this.state.rating > 3) {
                const arr = this.state.selectedUnits;
                arr.push(id);
                this.setState({
                    selectedUnits: arr
                });
            } else if (this.state.rating <= 3 && this.state.rating > 0) {
                const array1 = this.state.selectedUnitComplaint
                const array2 = this.state.selectedUnits

                const komplain = {
                    namaUnit: id,
                    deskripsi: '',
                    result: '',
                    idSurvei: '',
                    isSolved: 'false'
                };

                array1.push(komplain);
                array2.push(id);
                this.setState({
                    selectedUnitComplaint: array1,
                    selectedUnits: array2
                })
            }
        }
    }

    //event klik untuk unit parameter
    handleSecondClick(e) {
        e.preventDefault();
        let id = e.target.id;
        let className = document.getElementById(id).className;
        let arr = [];
        let res;
        arr = className.split(' ');

        if (arr.includes('transform-active')) {
            arr.pop();
            res = arr.join(' ');
            document.getElementById(id).className = res;
            let arr1 = id.split('-')
            const selected = {
                unit: arr1[0],
                parameter: arr1[1]
            };
            const array = this.state.selectedUnitParameters.filter(function (value) {
                return (value.unit !== selected.unit) && (value.parameter !== selected.parameter);
            });

            this.setState({
                selectedUnitParameters: array
            });
        }
        else {
            document.getElementById(id).className = className + ' transform-active';
            const array = id.split('-');
            const unitParameterObj = {
                "unit": array[0],
                "parameter": array[1],
            }
            this.setState({
                selectedUnitParameters: [...this.state.selectedUnitParameters, unitParameterObj]
            });
        }
    }

    refCallBack = (element) => {
        if (element) {
        }
    };

    render() {
        let selected = this.state.selectedUnits.length > 0 ? true : false;
        if (this.state.loading) {
            return (
                <Loading msg="Loading..." />
            )
        }

        if (this.state.showNotif) {
            return (
                <div>
                    <div>
                        <img className="cover" src={background1} alt="background1"></img>
                    </div>
                    <h1>{this.state.notif}</h1>
                </div>
            )
        }

        //check sebelum render, apakah state tipe survei (dari route Home) terkirim
        //jika tidak, kembali ke home
        if (this.props.location.state === undefined) {
            return (
                <Redirect to='/' />
            )
        }

        else if (this.state.changeForm === false) {
            return (
                <div>
                    <AlertList
                        position={this.state.position}
                        alerts={this.state.alerts}
                        timeout={this.state.timeout}
                        dismissTitle="Tutup"
                        onDismiss={this.onAlertDismissed.bind(this)}
                    />
                    <div>
                        <img className="cover" src={background1} alt="background1"></img>
                    </div>
                    <FormDataPasien
                        onBlur={this.handleBlurInput}
                        onSubmit={this.handlePatientSubmit}
                        pasien={this.state.pasienObj} />
                </div>
            )
        }
        else {
            return (
                <div>
                    <AlertList
                        position={this.state.position}
                        alerts={this.state.alerts}
                        timeout={this.state.timeout}
                        dismissTitle="Tutup"
                        onDismiss={this.onAlertDismissed.bind(this)}
                    />
                    <div>
                        <img className="cover" src={background2} alt="background2"></img>
                    </div>
                    <FormSurvei
                        namaPasien={this.state.pasienObj.nama.split(" ")[0]}
                        onChange={this.handleChange}
                        secondOnChange={this.secondHandleChange}
                        onSubmit={this.handlePostSubmit}
                        onClick={this.handleClick}
                        initialRating={this.state.rating}
                        type={this.state.jenisSurvei}
                        selectedUnits={this.state.selectedUnits}
                        unitSelected={selected}
                        onClickParam={this.handleSecondClick}
                        surveyFeedback={this.state.feedBack}
                        refCallBack={this.refCallBack}
                        onBlur={this.handleBlurInput}
                    />
                </div>
            )
        }
    }
}

export default SurveiPasien;