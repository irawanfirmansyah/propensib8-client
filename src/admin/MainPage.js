import React from 'react';
import { NavigationBar } from '../components/Navbar';
import CustomTable from '../components/Table';
import { UserRow } from '../components/Row';
import { Modal, Button } from 'react-bootstrap';
import background1 from '../img/background-1.png';

export const MainPage = (props) => {
    return (
        <div>
            <div>
                <img className="background-1" src={background1} alt="background1" />
            </div>
            <NavigationBar onClick={props.onClick}></NavigationBar>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="mr-auto p-2"><h1 className="title">Selamat datang, Admin !</h1></div>
                    <div className="p-2"><button className="btn btn-ca" onClick={props.changeView}>Buat Akun</button></div>
                </div>
                <CustomTable header={['Nama', 'Role', 'Ubah', 'Hapus']}>
                    <UserRow listUser={props.listUser} onClick={props.handleShow} onClickEdit={props.changeView}></UserRow>
                </CustomTable>
            </div>
            <Modal show={props.showModal} onHide={props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title><p className="modal-title">Hapus akun 'pasien'</p></Modal.Title>
                </Modal.Header>
                <form onSubmit={props.submitDelete}>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Konfirmasi Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="masukkan password anda"
                                required
                                defaultValue={props.password}
                                onChange={props.handleChange}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleHide}>Batal</Button>
                        <Button variant="danger" type="submit">Hapus</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}