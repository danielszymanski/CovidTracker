import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import "./InfoBox.css"

export default function InfoBox({ title, cases, total, color }) {
    return (
        <Card>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoBox_cases" style={color}>{cases}</h2>

                <Typography className="infoBox_total" color="textSecondary">
                {total} total
                </Typography>

            </CardContent>
        </Card>
    )
}
