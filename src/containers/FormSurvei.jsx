import React from 'react';
import Rating from 'react-rating';
import emptyStar from '../img/emptyStar.png';
import fullStar from '../img/fullStar.png';
import { UnitContainer } from '../components/UnitContainer';

const array1 = ['Perawat', 'Dokter', 'Radiologi', 'Laboratorium', 'Fasilitas Kamar', 'Makanan', 'Kebersihan Kamar', 'Fisioterapi', 'Kasir Rawat Inap', 'Pendaftaran Rawat Inap', 'IGD'];
const array2 = ['Perawat', 'Dokter', 'Radiologi', 'Laboratorium', 'Farmasi', 'Administrasi Rawat Jalan', 'Fisioterapi', 'IGD'];

const renderSwitch = (rating, tipe, eventClick, selectedUnits, unitSelected, onClickParam, stateFeedback, onChange, refCallBack, onBlur) => {
    // console.log(rating)
    let arr = [];
    if (tipe === 'Rawat Inap') {
        arr = array1;
    } else if (tipe === 'Rawat Jalan') {
        arr = array2;
    }
    // console.log(tipe)
    console.log(arr);
    return <UnitContainer
        ratingValue={rating}
        units={arr}
        onClick={eventClick}
        selectedUnits={selectedUnits}
        unitSelected={unitSelected}
        onClickParam={onClickParam}
        stateFeedback={stateFeedback}
        onChange={onChange}
        refCallBack={refCallBack}
        tipeSurvei={tipe}
        onBlur={onBlur}
    />
    // switch (true) {
    //     case (param > 3):
    //         console.log("> 3")
    //         message = 'Pelayanan mana yang Anda sukai?';
    //         return <UnitContainer text={message} units={arr} type={tipe} />;
    //     case (param <= 3 && param > 0):
    //         console.log("<=3")
    //         message = 'Apa yang perlu kami perbaiki?'
    //         return <UnitContainer text={message} units={arr} type={tipe} />;
    //     default:
    //         return null;
    // }
}

export const FormSurvei = (props) => {
    // console.log(props.unitSelected)
    return (
        <div className="container survei-pasien">
            <p className="font-title-2">Halo, {props.namaPasien} !</p>
            <div className="d-flex justify-content-center">
                <div className="div-1">Bagaimana pelayanan {props.type} kami?</div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="div-2">
                    <form onSubmit={props.onSubmit}>
                        {/* <input type="hidden" name="tanggal" id="currDate" value={today} onChange={props.onChange}/>
                    <input type="hidden" name="pasien" value="1" onChange={props.onChange}/> */}
                        <Rating
                            onChange={props.onChange}
                            name='rating'
                            emptySymbol={<img src={emptyStar} className='icon' alt='empty star' />}
                            fullSymbol={<img src={fullStar} className='icon' alt='filled star' />}
                            initialRating={props.initialRating}
                        />
                        <div>
                            {props.initialRating === 0 ? '' : renderSwitch(
                                props.initialRating, props.type, props.onClick, props.selectedUnits,
                                props.unitSelected, props.onClickParam, props.surveyFeedback,
                                props.secondOnChange, props.refCallBack, props.onBlur)}
                        </div>
                        {/* {props.initialRating > 3?(
                            <UnitContainer units={unitRating1} ratingValue={props.initialRating}/>
                        ) :(
                            <UnitContainer units={unitRating2} ratingValue={props.initialRating}/>
                        )} */}
                    </form>
                </div>
            </div>
        </div>
    )
}