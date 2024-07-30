import React from 'react';
import seeAllPageLayoutStyle from './SeeAllPageLayout.module.scss';
import { HeaderLayoutOne } from '../../..';

interface ISeeAllPageLayoutProps {
    props: any;
}
const SeeAllPageLayout = (allProps: ISeeAllPageLayoutProps) => {
    const { props } = allProps;
    const { componentTitle, seeAllPageUrl } = props;
    return (
        // <div className={gridLayoutStyle.quickLinks__grid} style={{ display: displayMode !== "Horizontal" ? "" : "none", padding: "15px", backgroundColor: "#F8F8F8" }}>
        //     <HeaderLayoutOne headerTitle={componentTitle} seeAllLinkUrl={seeAllPageUrl} />
        //     <div id="containerDiv" className={gridLayoutStyle.containerDiv} style={{ backgroundColor: displayMode !== "Horizontal" ? bgColor : "" }}>
        //         <div className={gridLayoutStyle.quickLinks__grid__div}>
        //             {record.map((link: any, index) => {
        //                 let a = document.getElementById('qLContainer')
        //                 let eleWidth = a.offsetWidth;
        //                 return (
        //                     <div
        //                         className={gridLayoutStyle["quickLinks__link-grid-div"]}
        //                         style={index % 5 == 0 ? { backgroundColor: "#FF8FD0" } : index % 5 == 1 ? { backgroundColor: "#7EE092" } : index % 5 == 2 ? { backgroundColor: "#FF8214" } : index % 5 == 3 ? { backgroundColor: "#6AA800" } : index % 5 == 4 ? { backgroundColor: "#53BFC5" } : { backgroundColor: "#FF8FD0" }}
        //                         onClick={() => {
        //                             window.open(link.RedirectURL.Url, "_blank");
        //                         }}
        //                         title={link.Title}
        //                     >
        //                         <img
        //                             src={
        //                                 link.Icon == null
        //                                     ? defaultIcon
        //                                     : window.location.origin +
        //                                     JSON.parse(link.Icon).serverRelativeUrl
        //                             }
        //                             className={gridLayoutStyle["quickLinks__link-grid-icon"]}
        //                         />
        //                         <p className={gridLayoutStyle["quickLinks__link-title_Grid"]}>
        //                             {link.Title}
        //                         </p>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //         {/* </Scrollbars> */}
        //     </div>
        // </div>
        <></>
    )
}

export default SeeAllPageLayout