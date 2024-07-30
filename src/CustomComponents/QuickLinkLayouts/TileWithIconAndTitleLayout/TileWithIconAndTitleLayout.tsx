import React, { useCallback } from 'react';
import tileWithIconAndTitleLayoutStyle from './TileWithIconAndTitleLayout.module.scss';
import { Scrollbars, HeaderLayoutOne, OverlayTrigger, Tooltip } from '../../../index';
// import '../../../Assets/Styles/bootstrap.min.css'; // Due to some conflict with SharePoint CSS, we need to update a row class that has been changed to a rows class in the bootstrap file

import { FaGlobe } from "react-icons/fa";

interface IGridLayoutProps {
    record: any[];
    props: any;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
    refMainContainer: HTMLElement;
}
export const TileWithIconAndTitleLayout = (allProps: IGridLayoutProps) => {
    const { props, record, componentLocationDetails, refMainContainer } = allProps;
    const { componentHeight, bgColor, tileColor, tileTextColor, hoverColor, componentTitle, seeAllPageUrl } = props;
    let bodySectionHeight = parseInt(componentHeight) - 50;
    let containerDivHeight = `${parseInt(componentHeight) - 40}px`;

    let styleAddBasedOnColumnSection = "";
    if (!componentLocationDetails.isFullWidthSectionUse && !componentLocationDetails.isAppPage) {
        switch (componentLocationDetails.sectionColumnDetail) {
            case "xl12":
                styleAddBasedOnColumnSection = tileWithIconAndTitleLayoutStyle.xl12Style;
                break;
            case "xl4":
                styleAddBasedOnColumnSection = tileWithIconAndTitleLayoutStyle.xl4Style;
                break;
            case "xl6":
                styleAddBasedOnColumnSection = tileWithIconAndTitleLayoutStyle.xl6Style;
                break;
            case "xl8":
                styleAddBasedOnColumnSection = tileWithIconAndTitleLayoutStyle.xl8Style;
                break;
            default:
                break;
        }
    }

    return (
        <div id="qLContainer" className={tileWithIconAndTitleLayoutStyle.tileWithOnlyTitle} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${styleAddBasedOnColumnSection}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3", height: containerDivHeight }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${tileWithIconAndTitleLayoutStyle.allItemsContainer}`}>
                        {record.map((item: any) => {
                            let imageThumbnailIcon = JSON.parse(item.Icon);
                            let imageIcon = imageThumbnailIcon == undefined || imageThumbnailIcon == null || imageThumbnailIcon == "" ? "defaultImage" : imageThumbnailIcon["serverRelativeUrl"];
                            const title = item.Title
                            // .length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                            const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                            return (
                                <div className={tileWithIconAndTitleLayoutStyle.quickLinkContainer} onClick={() => window.open(item.RedirectURL.Url, isOpenLinkInNewTab)}>
                                    <div style={{backgroundColor: tileColor}} className={tileWithIconAndTitleLayoutStyle.imgSection}>
                                        <div className={tileWithIconAndTitleLayoutStyle.iconContainer}>
                                            {
                                                imageIcon == "defaultImage"
                                                    ? <FaGlobe className={tileWithIconAndTitleLayoutStyle.defaultImage} style={{ color: "#ff8fd0" }} />
                                                    : <img src={imageIcon} ></img>
                                            }
                                        </div>
                                    </div>
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <div className={`${tileWithIconAndTitleLayoutStyle.quickLinkTitle}`} style={{color: tileTextColor}}> {title}</div>
                                    </OverlayTrigger>
                                </div>
                            );
                        })}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}
