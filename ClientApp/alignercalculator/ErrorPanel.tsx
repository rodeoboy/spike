import * as React from "react";
import FontAwesome = require("react-fontawesome");

const ErrorPanel = (props: any): JSX.Element => {
    return (
        <div >
            {props.messages.map(error => <span>{error.message}</span>)}           
        </div>
    );
};

export default ErrorPanel;