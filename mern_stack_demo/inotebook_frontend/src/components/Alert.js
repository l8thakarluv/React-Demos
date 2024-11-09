import React, { useContext } from 'react'
import alertContext from '../contexts/alert/alertContext';

const Alert = (props) => {
    const alertCotextObj = useContext(alertContext);
    const { alert } = alertCotextObj;
    // console.log('alertobj----------', alertObj);

    const capitalize  = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{height: '50px'}}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissable fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>: {alert.message}
            </div>}
        </div>
    )
}

export default Alert