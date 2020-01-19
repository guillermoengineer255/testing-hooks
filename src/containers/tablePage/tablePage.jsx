import React, { useEffect, useState } from 'react';
import { getCoinNames, proxyCors } from '../../config/services/api'
import { Table, TableRow, TableBody, TableCell, Typography, Button, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

import './tablePage.css'

export const TablePage = (props) => {
    let arrays = [];
    const [data, setData] = useState({})


    useEffect(() => {
        fetch(proxyCors + getCoinNames)
            .then(response => response.json()
            )
            .then(response =>
                setData(response.result)
            )
            .catch(() => console.log("Can’t access"))
    }, [])


    for (const base of Object.values(data)) {
        arrays.push(base.base)
    }
    let sortArray = [...new Set(arrays)];
    const shuffled = sortArray.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 3);

    const handleClick = (base) => {
        if (base !== undefined) {
            props.history.push({
                pathname: `base-details`,
                state: {
                    nameCoin: base,
                    coinsNames: selected
                },
            })
        }
    }
    return (
        <Paper className="paper-container">
            <p className="table-page-title">  Crypto Trader</p>
            {sortArray.length > 1 ? <Table>
                <TableBody>
                    {sortArray.sort().map((base, index) => {
                        return (
                            <TableRow key={index} className="row-body">
                                <TableCell align="center">
                                    <Typography className="crypto-name" >  {base} </Typography> </TableCell>
                                <TableCell align="center"> <Button onClick={() => handleClick(base)} className="table-button">TRADE</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table> : <Skeleton animation="wave" />}

        </Paper>
    )
}
export default withRouter(TablePage);
