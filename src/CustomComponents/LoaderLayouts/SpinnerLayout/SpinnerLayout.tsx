import React from 'react'
import styles from './SpinnerLayout.module.scss';
import { HeaderLayoutOne, Spinner } from '../../..';
interface ISpinnerLayout1 {
    props: any;
    height: string;
    label: string;
    labelPosition: 'top' | 'right' | 'bottom' | 'left';
}


const SpinnerLayout1 = (allProps: ISpinnerLayout1) => {
    const { props, height, labelPosition, label } = allProps;
    const { componentTitle, seeAllPageUrl, displayMode, componentHeight } = props;

    const actualHeight = displayMode != "Horizontal" ? `${String(componentHeight - 40)}px` : height;
    return (
        <div className={styles.spinnerLayout1} style={{ height: height }}>
            {/* {displayMode != "Horizontal" && <HeaderLayoutOne headerTitle={componentTitle} seeAllLinkUrl={seeAllPageUrl} />} */}
            <Spinner label={label} ariaLive="assertive" labelPosition={labelPosition} style={{ height: actualHeight, border: "1px solid rgb(211, 211, 211)" }} />
        </div>
    )
}

export { SpinnerLayout1 };
