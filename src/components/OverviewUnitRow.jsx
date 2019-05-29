import React from 'react';

export const OverviewUnitRow = (props) => {
    return (
        <tbody>
            {props.listUnit.map(unit => {
                return(
                    <tr key={unit.namaUnit}>
                        <td><p className="p-column">{unit.namaUnit}</p></td>
                        <td><p className="p-column">{unit.review}</p></td>
                        <td><p className="p-column">{unit.komplain}</p></td>
                        <td>
                            <button className="btn btn-detail" id={unit.namaUnit} onClick={props.onClick}>Detail</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}