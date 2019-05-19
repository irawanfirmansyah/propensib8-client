import React from 'react';

const roles = {
    'ROLE_USER': 'Kasir',
    'ROLE_ADMIN': 'Admin',
    'ROLE_CS': 'Customer Service',
    'ROLE_TOP_MANAGER': 'Top Manager',
    'ROLE_EXECUTIVE': 'Executive'
}

export const FormCreateUser = (props) => {
    return (
        <div className="form-1">
            <form onSubmit={props.createAccount} id="create">
                <p className="form-title-ua">Data Akun</p>
                <div className="form-row">
                    <div className="col-md-6">
                        <label className="form-label">Nama</label>
                        <input type="text" className="form-control input-1" name="name" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control input-1" name="username" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control input-1" name="email" required />
                    </div>
                    <div className="col-md-6">
                        <label>Role</label>
                        <select className="form-control input-1" name="role" required>
                            <option value="">--Pilih Role--</option>
                            {Object.keys(roles).map(key => {
                                return (
                                    <option key={key} value={key}>{roles[key]}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <p className="form-title-ua">Password</p>
                <div className="form-row">
                    <div className="col-6">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control input-1" name="password" required />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Ulangi Password Baru</label>
                        <input type="password" className="form-control input-1" name="repeatPassword" required />
                    </div>
                </div>
                <br></br>
                <div className="d-flex">
                    <div className="mr-auto p-2"><button className="btn btn-ua-warning" onClick={props.goBack}>Kembali</button></div>
                    <div className="p-2"><button type="submit" className="btn btn-ua">Create</button></div>
                </div>
            </form>
        </div>
    )
}