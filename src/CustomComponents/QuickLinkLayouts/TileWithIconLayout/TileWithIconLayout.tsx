import React from 'react'
import titleWithIconLayoutStyle from './TileWithIconLayout.module.scss';
import { Scrollbars, HeaderLayoutOne, OverlayTrigger, Tooltip } from '../../../index';
import { FaGlobe } from "react-icons/fa";

interface ITileWithIconLayoutProps {
    record: any[];
    props: any;
    refMainContainer: HTMLElement;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
}
export const TileWithIconLayout = (allProps: ITileWithIconLayoutProps) => {
    const { props, record, componentLocationDetails, refMainContainer } = allProps;
    const { componentHeight, bgColor, tileColor, tileTextColor, hoverColor, componentTitle, seeAllPageUrl, listName } = props;
    let bodySectionHeight = parseInt(componentHeight) - 50;
    let containerDivHeight = `${parseInt(componentHeight) - 40}px`;

    let styleAddBasedOnColumnSection = "";
    if (!componentLocationDetails.isFullWidthSectionUse && !componentLocationDetails.isAppPage) {
        switch (componentLocationDetails.sectionColumnDetail) {
            case "xl12":
                styleAddBasedOnColumnSection = titleWithIconLayoutStyle.xl12Style;
                break;
            case "xl4":
                styleAddBasedOnColumnSection = titleWithIconLayoutStyle.xl4Style;
                break;
            case "xl6":
                styleAddBasedOnColumnSection = titleWithIconLayoutStyle.xl6Style;
                break;
            case "xl8":
                styleAddBasedOnColumnSection = titleWithIconLayoutStyle.xl8Style;
                break;
            default:
                break;
        }
    }

    return (
        <div id="qLContainer" className={titleWithIconLayoutStyle.tileWithIconLayout} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${styleAddBasedOnColumnSection}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3", height: containerDivHeight }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${titleWithIconLayoutStyle.allItemsContainer}`}>
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
                                <div className={titleWithIconLayoutStyle.itemContainer} style={styling} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }}>
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <div className={titleWithIconLayoutStyle.iconContainer}>
                                            {
                                                imageIcon == "defaultImage"
                                                    ? <FaGlobe className={titleWithIconLayoutStyle.defaultImage} style={{ color: "#fff" }} />
                                                    : <img src={imageIcon} ></img>
                                            }
                                        </div>
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
