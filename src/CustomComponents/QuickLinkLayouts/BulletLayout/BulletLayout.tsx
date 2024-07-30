import React from 'react'
import { HeaderLayoutOne, OverlayTrigger, Scrollbars, Tooltip } from '../../..';
import bulletLayoutStyle from './BulletLayout.module.scss';
import { ImLink } from "react-icons/im";
interface IBulletViewProps {
    record: any[];
    props: any;
    refMainContainer: HTMLElement;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
}
export const BulletLayout = (allProps: IBulletViewProps) => {
    const { record, props, componentLocationDetails } = allProps;
    const { componentHeight, componentTitle, seeAllPageUrl, bgColor, tileTextColor, iconDefaultColor } = props;
    let bodySectionHeight = parseInt(componentHeight) - 72;

    const styleAddBasedOnFullWidthSection = componentLocationDetails.isFullWidthSectionUse ? bulletLayoutStyle.fullWithStyleManage : "";

    return (
        <div id="qLContainer" className={`${bulletLayoutStyle.bulletView} ${styleAddBasedOnFullWidthSection}`} style={{ height: `${componentHeight}px` }}>
            <div id="containerDiv" className={`${bulletLayoutStyle.containerDiv}`} style={{ backgroundColor: bgColor, border: "1px solid #d3d3d3" }}>
                <Scrollbars style={{ height: `${bodySectionHeight}px` }} autoHide>
                    <div className={`${bulletLayoutStyle.bulletViewContainer}`}>
                        {record.map((item: any) => {
                            const title = item.Title;
                            const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";

                            return (
                                <div className={bulletLayoutStyle.bulletViewItem}>
                                    <ImLink className={bulletLayoutStyle.defaultIcon} style={{ color: iconDefaultColor }} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }} />
                                    <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                        <p className={bulletLayoutStyle.bulletViewTitle} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }} style={{ color: tileTextColor }}>{title}</p>
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

