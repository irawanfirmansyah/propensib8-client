import React from 'react';

const unitRating1 = {
    1: ['Perawat', 'Dokter', 'Radiologi', 'Laboratorium'],
    2: ['Fasilitas Kamar', 'Makanan', 'Kebersihan Kamar', 'Fisioterapi'],
    3: ['Kasir Rawat Inap', 'Pendaftaran Rawat Inap', 'IGD'],
}


const unitRating2 = {
    1: ['Perawat', 'Dokter', 'Radiologi', 'Laboratorium'],
    2: ['Farmasi', 'Administrasi Rawat Jalan', 'Fisioterapi', 'IGD'],
}

const parameterGroup = {
    1: ['Perawat', 'Dokter', 'Radiologi', 'Laboratorium', 'Fisioterapi', 'IGD', 'Farmasi'],
    2: ['Kasir Rawat Inap', 'Pendaftaran Rawat Inap', 'Administrasi Rawat Jalan'],
    3: ['Kebersihan Kamar'],
    4: ['Makanan'],
    5: ['Fasilitas Kamar']
}

const createUnits = (units, eventClick, tipeSurvei) => {
    let length = units.length;
    let arr = [];
    let divs;
    let res;
    for (let i = 0; i < length / 4; i++) {
        arr.push('d-flex justify-content-center');
        // var div = document.createElement('div');
        divs = arr.map(item => item);
        res = divs;
    }
    res = divs.map((item, index) => <div className={item} key={index}>{createItems(index + 1, eventClick, tipeSurvei)}</div>);
    return (
        res
    )
}


const createFeedback = (unitSelected, stateFeedback, onChange) => {
    let style;
    if (unitSelected) {
        style = 'block';
    }
    else {
        style = 'none'
    }
    return (
        <div className="div-5" id="div5" style={{ display: style }}>
            <p>Apa yang membuat pelayanannya memuaskan?</p><textarea className="form-control input-3" onChange={onChange} value={stateFeedback} placeholder="Sampaikan di sini. . ."></textarea>
        </div>
    )
}

const createItems = (index, eventClick, tipeSurvei) => {

    let res;
    if (tipeSurvei === 'Rawat Inap') {
        res = unitRating1[index].map(item => {
            if (item.length < 17) {
                return <div className="unit-item transform" onClick={eventClick} id={item} key={item}>{item}</div>
            } else {
                return <div className="unit-item-1 transform" onClick={eventClick} id={item} key={item}>{item}</div>
            }
        });
    }
    else if (tipeSurvei === 'Rawat Jalan') {
        res = unitRating2[index].map(item => {
            if (item.length < 17) {
                return <div className="unit-item transform" onClick={eventClick} id={item} key={item}>{item}</div>
            } else {
                return <div className="unit-item-1 transform" onClick={eventClick} id={item} key={item}>{item}</div>
            }
        });
    }
    return (
        res
    )
}


const createParameters = (unit, paramClick) => {
    let result;
    let groupParameter1 = parameterGroup[1];
    let groupParameter2 = parameterGroup[2];
    let groupParameter3 = parameterGroup[3];
    let groupParameter4 = parameterGroup[4];
    let groupParameter5 = parameterGroup[5];
    if (groupParameter1.includes(unit)) {
        let arr = ['Keramahan', 'Kecepatan Layanan', 'Keterampilan', 'Komunikasi'];
        result = arr.map((item) => {
            return <div className="param-item transform" onClick={paramClick} id={unit + "-" + item} key={item}>
                {item}
            </div>
        });
    }
    else if (groupParameter2.includes(unit)) {
        let arr = ['Keramahan', 'Kecepatan Layanan', 'Ketelitian', 'Komunikasi'];
        result = arr.map((item) => {
            return <div className="param-item transform" onClick={paramClick} id={unit + "-" + item} key={item}>
                {item}
            </div>
        });
    }
    else if (groupParameter3.includes(unit)) {
        let arr = ['Kamar Mandi', 'Lantai/Dinding', 'Tempat Tidur'];
        result = arr.map((item) => {
            return <div className="param-item transform" onClick={paramClick} id={unit + "-" + item} key={item}>
                {item}
            </div>
        });
    }
    else if (groupParameter4.includes(unit)) {
        let arr = ['Variasi Menu', 'Cara Penyajian', 'Cita Rasa'];
        result = arr.map((item) => {
            return <div className="param-item transform" onClick={paramClick} id={unit + "-" + item} key={item}>
                {item}
            </div>
        });
    }
    else if (groupParameter5.includes(unit)) {
        let arr = ['AC/Ventilasi', 'Penerangan', 'Keamanan'];
        result = arr.map((item) => {
            return <div className="param-item transform" onClick={paramClick} id={unit + "-" + item} key={item}>
                {item}
            </div>
        });
    }

    return (
        <div className="d-flex justify-content-start">
            {result}
        </div>
    )
}

const createComplaint = (units, selectedUnits, onClick, onBlur) => {
    let res = units.map((item) => {
        if (selectedUnits.includes(item)) {
            return <div className="div-6" id={item} style={{ display: 'block' }} key={item}>
                <p>Aspek yang perlu diperbaiki dari <b>{item}</b> kami?</p>
                <p className="hidden-text">*Pilih salah satu kriteria di bawah ini (<strong>wajib</strong>)</p>
                {createParameters(item, onClick)}
                <textarea className="form-control input-3" onBlur={onBlur} id={"text" + item} required placeholder="Sampaikan keluhan Anda di sini . . ."></textarea>
            </div>
        }
        else {
            return <div className="div-6" id={item} style={{ display: 'none' }} key={item}>
                <p>Aspek apa yang perlu diperbaiki?</p>
                <p className="hidden-text">*Pilih salah satu kriteria di bawah ini</p>
                {createParameters(item, onClick)}
                <textarea className="form-control input-3" onBlur={onBlur} id={"text" + item} placeholder={"Isi komplain " + item + " ..."}></textarea>
            </div>
        }
    });
    return (
        <div>
            {res}
        </div>
    )
}

export const UnitContainer = (props) => {
    let res;
    let resButton;
    let button1 = <button className="btn btn-submit" type="submit">Selesai</button>
    let button2 = <button className="btn btn-submit-hid" type="submit">Selesai</button>
    let button3 = <button className="btn btn-submit-hid-1" type="submit">Selesai</button>
    if (props.ratingValue > 3) {
        res = createFeedback(props.unitSelected, props.stateFeedback, props.onChange);
        if (props.unitSelected) {
            resButton = button2;
        } else {
            resButton = button1;
        }
    }
    else if (props.ratingValue <= 3 && props.ratingValue > 0) {
        res = createComplaint(props.units, props.selectedUnits, props.onClickParam, props.onBlur);
        if (props.unitSelected) {
            resButton = button3;
        }
    }

    let result =
        <div>
            {res}
            {resButton}
        </div>

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="div-3">
                    {props.ratingValue > 3 ? 'Pelayanan mana yang Anda sukai?' : 'Apa yang perlu kami perbaiki?'}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className={props.tipeSurvei === 'Rawat Jalan' ? "div-4-1" : "div-4"} id="div4" ref={props.refCallBack}>
                    {createUnits(props.units, props.onClick, props.tipeSurvei)}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {result}
            </div>
        </div>
    )
}