import { useState } from "react"
import alertContext from "./alertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({message, type});

        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    console.log('props------------', props);
    return (
        <alertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;