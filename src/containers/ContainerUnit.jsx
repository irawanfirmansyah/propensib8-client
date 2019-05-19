import React from 'react';
import ARJ from '../img/Administrasi Rawat Jalan.png';
import Dokter from '../img/Dokter.png';
import Farmasi from '../img/Farmasi.png';
import FK from '../img/Fasilitas Kamar.png';
import Fisio from '../img/Fisioterapi.png';
import IGD from '../img/IGD.png';
import KRI from '../img/Kasir Rawat Inap.png';
import KK from '../img/Kebersihan Kamar.png';
import Lab from '../img/Laboratorium.png';
import Makanan from '../img/Makanan.png';
import PRI from '../img/Pendaftaran Rawat Inap.png';
import Radio from '../img/Radiologi.png';
import Perawat from '../img/Perawat.png';
import arrow from '../img/arrow.png';

const images = {
    "Administrasi Rawat Jalan": ARJ,
    "Dokter": Dokter,
    "Farmasi": Farmasi,
    "Fasilitas Kamar": FK,
    "Fisioterapi": Fisio,
    "IGD": IGD,
    "Kasir Rawat Inap": KRI,
    "Kebersihan Kamar": KK,
    "Laboratorium": Lab,
    "Makanan": Makanan,
    "Pendaftaran Rawat Inap": PRI,
    "Radiologi": Radio,
    "Perawat": Perawat
}

export const ContainerUnit = (props) => {
    return (
        <div>
            <div className="d-flex justify-content-around align-items-center">
                <img className="arrow" src={arrow} onClick={props.goBack} alt="" />
                <div className="unit-elem">
                    <img className="img-units" src={images[props.unit.namaUnit]} alt="" />
                    <p className="font-unit-elem-1">{props.unit.namaUnit}</p>
                </div>
                <div className="list-detail">
                    <div className="flex-center">
                        <p className="font-unit-elem">Komplain terselesaikan</p>
                        <div id="circle">{!props.unit.komplainSolved ? "0" : props.unit.komplainSolved}</div>
                    </div>
                    <div className="flex-center">
                        <p className="font-unit-elem">Komplain belum selesai</p>
                        <div id="circle">{!props.unit.komplain ? "0" : props.unit.komplain - props.unit.komplainSolved}</div>
                    </div>
                    <div className="flex-center">
                        <p className="font-unit-elem">Review Pasien</p>
                        <div id="circle-end">{!props.unit.review ? "0" : props.unit.review}</div>
                    </div>
                </div>
                <button className="btn btn-hist">Riwayat</button>
            </div>
            <br></br>
            <div className="container">
                <div className="d-flex justify-content-end align-self-end" id="fs">
                    <p className={props.type === 'total' ? "font-select fs-active" : "font-select"} onClick={props.changeType} id="total">Rawat Jalan dan Rawat Inap</p><span className="span-select"> | </span>
                    <p className={props.type === 'Rawat Jalan' ? "font-select fs-active" : "font-select"} onClick={props.changeType} id="Rawat Jalan">Rawat Jalan</p><span className="span-select"> | </span>
                    <p className={props.type === 'Rawat Inap' ? "font-select fs-active" : "font-select"} onClick={props.changeType} id="Rawat Inap">Rawat Inap</p>
                </div>
                {props.children}
            </div>
        </div>
    )
}