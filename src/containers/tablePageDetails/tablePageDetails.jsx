import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, TableRow, TextField, TableBody, TableCell, Button } from '@material-ui/core';
import clsx from 'clsx';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './tablePageDetails.css'


export const TablePageDetails = (props) => {

    const [arrayCoins, setArrayCoins] = useState([])
    const [amount, setAmount] = useState(0)
    const [base, setBase] = useState('')
    const [selectBase, setSelectBase] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [isButtonSelected, setIsButtonSelected] = useState(false)

    useEffect(() => {
        if (props.location.state) {
            setArrayCoins(props.location.state.coinsNames)
            setBase(props.location.state.nameCoin)
        }
    }, [props.location.state])

    const handleClickSelect = (nameCoinMoney) => {
        if (nameCoinMoney !== base) {
            setShowSuccessMessage(false)
            setIsButtonSelected(true)
            setSelectBase(nameCoinMoney)
        } else {
            alert("Its not possible to trade with the same base")
        }
    }
    const getBack = () => {
        props.history.goBack();
    }

    return (
        <div>
            <div>
                <ArrowBackIcon className="icon" onClick={() => getBack()} />
                <span className="coin-name-title"> Trade {base} </span>
            </div>
            <div className="colum-bottoms">
                {props.location.state.nameCoin ? <Table>
                    <TableBody>{arrayCoins.map((quote, index) => {
                        return (
                            <TableRow key={index}><TableCell align="center">
                                    <Button className={clsx({
                                        ["selected-bottom"]: selectBase === quote,
                                        ["coins-selected-bottom"]: selectBase !== quote
                                    })} onClick={() => handleClickSelect(quote)}>SELL FOR {quote}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
                    : <div> <p>There is a problem conection  </p></div>}
            </div>
            {isButtonSelected && 
                <div className="input-container ">
                    <TextField className="textField" type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
                    {amount >= 1 &&  
                    <Button className="button-trade" onClick={() => setShowSuccessMessage(true)}> TRADE NOW!</Button> }
                    <div className="text-label-container">
                        {showSuccessMessage &&
                            <p className="successful-message"> Trade between {base} and {selectBase} succesful! </p>}
                    </div>
                </div>}
        </div>
    )
}
export default withRouter(TablePageDetails);
