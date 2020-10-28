import React from 'react'
import './Table.css'

export default function Table({ countries }) {
    return (
        <div className="table">
            {
                countries.map(({ country, cases },index) => (
                    <tr>
                        <th>{index+1}.</th>
                        <th>{country}</th>
                        <th>{cases}</th>
                    </tr>
                ))}
        </div >
    )
}
