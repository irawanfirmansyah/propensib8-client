import React from 'react';
import {Link} from 'react-router-dom';
import rawatjalan from '../img/rawat_jalan.png';
import rawatinap from '../img/rawat_inap.png';

var buttons = [1, 2];

export const HomeButtons = (props) => {
    return (
        <div>
            <Link to={{
                pathname: props.path,
                state: {
                    tipeSurvei: props.tipe
                }
            }}>
                <button className="front-content" id="rawat jalan">
                    <p className="font-content-1" id="rawat jalan">{props.tipe}</p>
                    <img className="front-img" src={props.img} alt="" id="" />
                </button>
            </Link>
        </div>
    );
}