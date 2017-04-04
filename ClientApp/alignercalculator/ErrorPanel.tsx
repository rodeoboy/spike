import * as React from "react";
import FontAwesome = require("react-fontawesome");

const ErrorPanel = (props: any): JSX.Element => {
    return (
        <div >
            <ul>
                {props.messages.map(error => <li key={props.messages.indexOf(error.message)}>{error.message}</li>)}  
            </ul>         
        </div>
    );
};

export default ErrorPanel;