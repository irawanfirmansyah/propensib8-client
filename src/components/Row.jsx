import React from 'react';

const roles = {
    'ROLE_USER': 'Kasir',
    'ROLE_CS': 'Customer Service',
    'ROLE_ADMIN': 'Admin'
}

export const CustomRow = (props) => {
    if (props.listKomplain) {
        return (
            <tbody>
                {props.listKomplain.map(komplain => {
                    return (
                        <tr key={komplain.deskripsi}>
                            <td><p className="p-column">{komplain.nama}</p></td>
                            <td><p className="p-column">{komplain.tanggalIsi}</p></td>
                            <td><p className="p-column">{komplain.deskripsi}</p></td>
                            <td><p className="p-column">{komplain.rating}</p></td>
                            <td>
                                <button className="btn btn-detail" id={komplain.id} onClick={props.onClick}>Selesaikan</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }
    return (
        <tbody>
            {props.listReview.map(review => {
                return (
                    <tr key={review.deskripsi}>
                        <td><p className="p-column">{review.nama}</p></td>
                        <td><p className="p-column">{review.tanggalIsi}</p></td>
                        <td><p className="p-column">{review.deskripsi}</p></td>
                        <td><p className="p-column">{review.rating}</p></td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export const UserRow = (props) => {
    return (
        <tbody>
            {props.listUser.map(user => {
                return (
                    <tr key={user.id}>
                        <td><p className="p-column">{user.name}</p></td>
                        <td><p className="p-column">{roles[user.role]}</p></td>
                        <td><button className="btn btn-detail" id={user.id} onClick={props.onClickEdit}>Ubah</button></td>
                        <td><button className="btn btn-detail" id={user.id} onClick={props.onClick}>Hapus</button></td>
                    </tr>
                )
            })}
        </tbody>
    )
}

function getUrgensiType(rating, tanggal) {
    const tgl = tanggal.split('-');
    const today = new Date();
    const date = new Date(tgl[0], tgl[1], tgl[2]);
    let tipe = 0;

    if (rating <= 2) {
        if (today - date > 5 && rating == 1) {
            tipe = 2;
        } else {
            tipe = 1;
        }
    } else {
        tipe = 0;
    }
    const txt = ["Rendah", "Menengah", "Tinggi"];
    const btn = ["btn-navy", "btn-yellow", "btn-red"];
    return <p className={btn[tipe]}>{txt[tipe]}</p>;
}

export const KomplainRow = (props) => {
    return (
        <tbody>
            {props.listKomplain.map(item => {
                
                console.log(item);
                return (
                    <tr key={item.pasien.id}>
                        <td><p className="p-column">{item.pasien.nama}</p></td>
                        <td><p className="p-column">{item.listKomplain[0].tanggal}</p></td>
                        <td><p className="p-column">{item.rating}</p></td>
                        <td>{getUrgensiType(item.rating, item.listKomplain[0].tanggal)}</td>
                        <td><button className="btn btn-table" id={item.idSurvei} onClick={props.onClick}>Selesaikan</button></td>
                    </tr>
                )
            })}
        </tbody>
    )
}
