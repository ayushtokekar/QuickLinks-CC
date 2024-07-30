import React from 'react'
import rectangleLayoutStyle from './RectangleLayout.module.scss';
import { Scrollbars, HeaderLayoutOne, OverlayTrigger, Tooltip } from '../../../index';
import { FaGlobe } from "react-icons/fa";

interface IRectangleLayoutProps {
    record: any[];
    props: any;
    refMainContainer: HTMLElement;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
}
export const RectangleLayout = (allProps: IRectangleLayoutProps) => {
    const { props, record, componentLocationDetails, refMainContainer } = allProps;
    const { componentHeight, bgColor, tileColor, tileTextColor, hoverColor, componentTitle, seeAllPageUrl, listName } = props;
    let bodySectionHeight = parseInt(componentHeight) - 50;
    let containerDivHeight = `${parseInt(componentHeight) - 40}px`;

    let styleAddBasedOnColumnSection = "";
    if (!componentLocationDetails.isFullWidthSectionUse && !componentLocationDetails.isAppPage) {
        switch (componentLocationDetails.sectionColumnDetail) {
            case "xl12":
                styleAddBasedOnColumnSection = rectangleLayoutStyle.xl12Style;
                break;
            case "xl4":
                styleAddBasedOnColumnSection = rectangleLayoutStyle.xl4Style;
                break;
            case "xl6":
                styleAddBasedOnColumnSection = rectangleLayoutStyle.xl6Style;
                break;
            case "xl8":
                styleAddBasedOnColumnSection = rectangleLayoutStyle.xl8Style;
                break;
            default:
                break;
        }
    }

    return (
        <div id="qLContainer" className={rectangleLayoutStyle.rectangleLayout} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${styleAddBasedOnColumnSection}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3", height: containerDivHeight }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${rectangleLayoutStyle.allItemsContainer}`}>
                        {record.map((item: any) => {
                            let imageThumbnailIcon = JSON.parse(item.Icon);
                            let imageIcon = imageThumbnailIcon == undefined || imageThumbnailIcon == null || imageThumbnailIcon == "" ? "defaultImage" : imageThumbnailIcon["serverRelativeUrl"];

                            const title = item.Title
                            // .length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                            const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                            let styling: any = {
                                "--bgColor": tileColor,
                                "--bgColorOnHover": hoverColor
                            }

                            return (
                                <div className={rectangleLayoutStyle.itemContainer} style={styling} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }}>
                                    <div className={rectangleLayoutStyle.iconContainer}>
                                        {
                                            imageIcon == "defaultImage"
                                                ? <FaGlobe className={rectangleLayoutStyle.defaultImage} style={{ color: "#fff" }} />
                                                : <img src={imageIcon} ></img>
                                        }
                                    </div>
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <p className={rectangleLayoutStyle.itemTitle} style={{color: tileTextColor}}>{title}</p>
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
