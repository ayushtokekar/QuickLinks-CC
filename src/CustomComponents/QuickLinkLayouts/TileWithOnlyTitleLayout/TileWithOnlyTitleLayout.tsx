import React, { useCallback } from 'react';
import TileWithOnlyTitleLayoutStyle from './TileWithOnlyTitleLayout.module.scss';
import { Scrollbars, HeaderLayoutOne, OverlayTrigger, Tooltip } from '../../../index';
// import '../../../Assets/Styles/bootstrap.min.css'; // Due to some conflict with SharePoint CSS, we need to update a row class that has been changed to a rows class in the bootstrap file

interface ITileWithOnlyTitleLayoutProps {
    record: any[];
    props: any;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
    refMainContainer: HTMLElement;
}
export const TileWithOnlyTitleLayout = (allProps: ITileWithOnlyTitleLayoutProps) => {
    const { props, record, componentLocationDetails, refMainContainer } = allProps;
    const { componentHeight, bgColor, tileColor, tileTextColor, hoverColor, componentTitle, seeAllPageUrl, listName } = props;
    let bodySectionHeight = parseInt(componentHeight) - 50;
    let containerDivHeight = `${parseInt(componentHeight) - 40}px`;

    let styleAddBasedOnColumnSection = "";
    if (!componentLocationDetails.isFullWidthSectionUse && !componentLocationDetails.isAppPage) {
        switch (componentLocationDetails.sectionColumnDetail) {
            case "xl12":
                styleAddBasedOnColumnSection = TileWithOnlyTitleLayoutStyle.xl12Style;
                break;
            case "xl4":
                styleAddBasedOnColumnSection = TileWithOnlyTitleLayoutStyle.xl4Style;
                break;
            case "xl6":
                styleAddBasedOnColumnSection = TileWithOnlyTitleLayoutStyle.xl6Style;
                break;
            case "xl8":
                styleAddBasedOnColumnSection = TileWithOnlyTitleLayoutStyle.xl8Style;
                break;
            default:
                break;
        }
    }

    return (
        <div id="qLContainer" className={TileWithOnlyTitleLayoutStyle.tileWithOnlyTitle} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${styleAddBasedOnColumnSection}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3", height: containerDivHeight }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${TileWithOnlyTitleLayoutStyle.allItemsContainer}`}>
                        {record.map((item: any) => {
                            const title = item.Title
                            // .length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                            const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                            let styling: any = {
                                "--bgColor": tileColor,
                                "--bgColorOnHover": hoverColor
                            }

                            return (
                                <div className={TileWithOnlyTitleLayoutStyle.itemContainer} style={styling} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }}>
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <p className={TileWithOnlyTitleLayoutStyle.itemTitle} style={{color: tileTextColor}}>{title}</p>
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
