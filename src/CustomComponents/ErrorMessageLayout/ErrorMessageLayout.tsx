import React from 'react';
import errorMessageStyle from './ErrorMessageLayout.module.scss';

interface ErrorMessageProps {
    message: string;
    height: string;
}

const ErrorMessageLayoutOne = (allProps: ErrorMessageProps) => {
    const { message, height } = allProps;

    return (
        <div className={errorMessageStyle.errorMessageContainer} style={{ height: height }}>{message}</div>
    )
}

const ErrorMessageLayoutTwo = (allProps: ErrorMessageProps) => {
    const { message, height } = allProps;

    return (
        <div className={`${errorMessageStyle.errorMessageContainer} ${errorMessageStyle.errorMessageLayoutTwoAdditionalStyle}`} style={{ height: height }}>{message}</div>
    )
}


export { ErrorMessageLayoutTwo, ErrorMessageLayoutOne }