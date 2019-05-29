import React from 'react';

function validateButton(pasien) {
    console.log(pasien);
    // if(!pasien.id && !pasien.)
    if(pasien.alamat && pasien.id && pasien.idMedrec &&
        pasien.jenisKelamin && pasien.nama && pasien.nik &&
        pasien.nomorHp && pasien.nomorTelepon &&
        pasien.tanggalLahir && pasien.tempatLahir){
            return true
        }
    return false
}


export const FormDataPasien = (props) => {
    return (
        <div className="container data-pasien">
            <div className="title-1">
                <h2 className="font-title-1">Data Pasien</h2>
            </div>
            <div className="form-1">
                <form onSubmit={props.onSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-md-6">
                            <label className="form-label">Nomor Medrec<span style={{ color: 'red' }}>*</span></label>
                            <input type="text"
                                className="form-control input-1"
                                name="nama"
                                onBlur={props.onBlur}
                                required
                                defaultValue={!props.pasien.idMedrec ? "" : props.pasien.idMedrec}
                            />
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <div className="form-row">
                        <div className="col-6">
                            <label className="form-label">Nama Pasien</label>
                            <input type="text" className="form-control input-1" name="nama" defaultValue={!props.pasien.nama ? "" : props.pasien.nama} readOnly />
                        </div>
                        <div className="col-6">
                            <label className="form-label">NIK</label>
                            <input type="text" className="form-control input-1" name="nik" defaultValue={!props.pasien.nik ? "" : props.pasien.nik} readOnly />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <label className="form-label">Alamat</label>
                            <input type="text" className="form-control input-2" name="nik" defaultValue={!props.pasien.alamat ? "" : props.pasien.alamat} readOnly />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-6">
                            <label className="form-label">Nomor HP</label>
                            <input type="text" className="form-control input-1" name="nomorHp" defaultValue={!props.pasien.nomorHp ? "" : props.pasien.nomorHp} readOnly />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Nomor Telepon</label>
                            <input type="text" className="form-control input-1" name="nomorTelepon" defaultValue={!props.pasien.nomorTelepon ? "" : props.pasien.nomorTelepon} readOnly />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-6">
                            <label className="form-label">Tempat Lahir</label>
                            <input type="text" className="form-control input-1" name="tempatLahir" defaultValue={!props.pasien.tempatLahir ? "" : props.pasien.tempatLahir} readOnly />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Tanggal Lahir</label>
                            <input type="date" className="form-control input-1" name="tanggalLahir" defaultValue={!props.pasien.tanggalLahir ? "" : props.pasien.tanggalLahir} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col last-col">
                            {validateButton(props.pasien) ? <button type="submit" className="btn btn-next">Selanjutnya</button> :
                            <button type="submit" className="btn btn-next" disabled>Selanjutnya</button>
                        }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}