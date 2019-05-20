import React from 'react';
import userImg from '../img/user.png';

export const DetailPasien = (props) => {
    return (
        <div className="d-flex justify-content-start align-items-center">
            <img className="user-img" src={userImg} alt="user"/>
            <div>
                <p className="title-data-pasien">Komplain {props.item.pasien.nama}</p>
                <p className="font-data-pasien">Nomor HP : {props.item.pasien.nomorHp}</p>
                <p className="font-data-pasien">Nomor telepon : {props.item.pasien.nomorTelepon}</p>
                <p className="font-data-pasien">Alamat rumah : {props.item.pasien.alamat}</p>
                <div className="item-flex-pasien">
                    <p className="font-data-pasien">Tanggal komplain : {props.item.listKomplain[0].tanggal}</p>
                </div>
            </div>
        </div>
    )
}