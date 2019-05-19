import React from 'react';

export const FormUpdateUser = (props) => {
    return (
        <div className="form-1" id="update">
            <form onSubmit={props.onSubmit}>
                <p className="form-title-ua">Data Akun</p>
                <div className="form-row">
                    <div className="col-md-6">
                        <label className="form-label">Nama</label>
                        <input type="text" className="form-control input-1" name="name" required defaultValue={!props.user.name ? "" : props.user.name} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control input-1" name="email" required defaultValue={!props.user.email ? "" : props.user.email} />
                    </div>
                </div>
                <br></br>
                <input type="hidden" name="role" defaultValue={props.user.role}></input>
                <p className="form-title-ua">Ubah Password</p>
                <div className="form-row">
                    <div className="col-6">
                        <label className="form-label">Password Lama</label>
                        <input type="password" className="form-control input-1" name="oldPassword" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-6">
                        <label className="form-label">Password Baru</label>
                        <input type="password" className="form-control input-1" name="newPassword" required />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Ulangi Password Baru</label>
                        <input type="password" className="form-control input-1" name="repeatNewPassword" required />
                    </div>
                </div>
                <br></br>
                <div className="d-flex">
                    <div className="mr-auto p-2"><button className="btn btn-ua-warning" onClick={props.goBack}>Kembali</button></div>
                    <div className="p-2"><button type="submit" className="btn btn-ua">Ubah</button></div>
                </div>
            </form>
        </div>
    )
}