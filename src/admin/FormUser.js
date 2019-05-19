import React from 'react';
import background1 from '../img/background-1.png';
import { NavigationBar } from '../components/Navbar';
import { FormUpdateUser } from './FormUpdateUser';
import { FormCreateUser } from './FormCreateUser';

export const FormUser = (props) => {
    console.log(props.user);
    const form = props.user.name ? <FormUpdateUser {...props} /> : <FormCreateUser {...props} />
    return (
        <div>
            <div>
                <img className="background-1" src={background1} alt="background" />
            </div>
            <NavigationBar onClick={props.onClick}></NavigationBar>
            <div className="container data-pasien">
                {props.user.name ? <h1 className="title-ua">Ubah akun {props.user.name}</h1> : <h1 className="title-ua">Buat akun</h1>}
                {form}
            </div>
        </div>
    )
}