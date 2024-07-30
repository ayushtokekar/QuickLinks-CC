import React, { useCallback } from 'react';
import gridLayoutStyle from './GridLayout.module.scss';
import { Scrollbars, HeaderLayoutOne, defaultIcon, GenerateRandomColor, OverlayTrigger, Tooltip } from '../../../index';
// import '../../../Assets/Styles/bootstrap.min.css'; // Due to some conflict with SharePoint CSS, we need to update a row class that has been changed to a rows class in the bootstrap file

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
export const GridLayout = (allProps: IGridLayoutProps) => {

    const { props, record, componentLocationDetails, refMainContainer } = allProps;
    const { componentHeight, bgColor, tileColor, tileTextColor, hoverColor, componentTitle, seeAllPageUrl, listName } = props;
    let bodySectionHeight = parseInt(componentHeight) - 72;

    // const GenerateRandomColorFunc = useCallback(GenerateRandomColor, [listName]);
    const styleAddBasedOnFullWidthSection = componentLocationDetails.isFullWidthSectionUse ? gridLayoutStyle.fullWithStyleManage : "";
    let styleAddBasedOnColumnSection = "";
    if (!componentLocationDetails.isFullWidthSectionUse && !componentLocationDetails.isAppPage) {
        switch (componentLocationDetails.sectionColumnDetail) {
            case "xl12":
                styleAddBasedOnColumnSection = gridLayoutStyle.xl12Style;
                break;
            case "xl4":
                styleAddBasedOnColumnSection = gridLayoutStyle.xl4Style;
                break;
            case "xl6":
                styleAddBasedOnColumnSection = gridLayoutStyle.xl6Style;
                break;
            case "xl8":
                styleAddBasedOnColumnSection = gridLayoutStyle.xl8Style;
                break;
            default:
                break;
        }
    }

    return (
        <div id="qLContainer" className={`${gridLayoutStyle.quickLinks} ${styleAddBasedOnFullWidthSection}`} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${gridLayoutStyle.containerDiv} ${styleAddBasedOnColumnSection}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3" }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${gridLayoutStyle.quickLinks__grid__div}`}>
                        {record.map((item: any) => {
                            const title = item.Title.length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                            const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                            const iconUrl = item.Icon == null ? defaultIcon : window.location.origin + JSON.parse(item.Icon).serverRelativeUrl;
                            let styling: any = {
                                "--bgColor": tileColor,
                                "--bgColorOnHover": hoverColor
                            }
                            
                            return (
                                <div className={gridLayoutStyle["quickLinks__link-grid-div"]} style={styling} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }}>
                                    <img src={iconUrl} className={gridLayoutStyle["quickLinks__link-grid-icon"]} />
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <p className={gridLayoutStyle["quickLinks__link-title_Grid"]} style={{color: tileTextColor}}>{title}</p>
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
