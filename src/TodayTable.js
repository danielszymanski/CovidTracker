import React from 'react'
import './Table.css'

export default function TodayTable({ countries }) {
    return (
        <div className="table">
            {
                countries.map(({ country, todayCases },index) => (
                    <tr>
                        <th>{index+1}.</th>
                        <th>{country}</th>
                        <th>{todayCases}</th>
                    </tr>
                ))}
        </div >
    )
}
