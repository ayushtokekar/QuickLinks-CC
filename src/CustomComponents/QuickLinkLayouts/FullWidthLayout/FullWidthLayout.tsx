import React from 'react';
import fullWidthLayoutStyle from './FullWidthLayout.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //npm install slick-carousel --save
// import '../../../Assets/Styles/bootstrap.min.css'; // Due to some conflict with SharePoint CSS, we need to update a row class that has been changed to a rows class in the bootstrap file
import { Slider, defaultIcon, Tooltip, OverlayTrigger, GenerateBackgroundColorBasedOnTextColor } from '../../../index';


interface IFullWidthLayoutProps {
    record: any[];
    props: any;
    componentLocationDetails: {
        isFullWidthSectionUse: boolean,
        sectionColumnDetail: string,
        isAppPage: boolean
    };
    refMainContainer: HTMLElement;
}

export const FullWidthLayout = (allProps: IFullWidthLayoutProps) => {
    const { record, props, componentLocationDetails, refMainContainer } = allProps;
    const { isFullWidthSectionUse, sectionColumnDetail, isAppPage } = componentLocationDetails;
    let isRequiredSlider = true;

    let settings = {
        className: '',
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.floor(refMainContainer.offsetWidth / 137),
        slidesToScroll: 1,
    }

    if (isFullWidthSectionUse) {
        isRequiredSlider = (refMainContainer.offsetWidth >= record.length * 137) ? false : true;
    }

    return (
        <div id="qLContainer" className={fullWidthLayoutStyle.quickLinks} style={{ padding: isRequiredSlider ? "20px 22px 20px 30px" : "20px 10px" }}>
            {
                isRequiredSlider
                    ? <div className={fullWidthLayoutStyle.quickLinks__horizontal}>
                        <Slider {...settings}>
                            {record.map((item: any) => {
                                const title = item.Title.length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                                const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                                const iconUrl = item.Icon == null ? defaultIcon : window.location.origin + JSON.parse(item.Icon).serverRelativeUrl;
                                return (
                                    <div>
                                        <div className={fullWidthLayoutStyle["quickLinks__link-div"]} onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }} style={{ backgroundColor: GenerateBackgroundColorBasedOnTextColor({ colorMode: 'dark' }) }}>
                                            <img src={iconUrl} className={fullWidthLayoutStyle["quickLinks__link-icon"]} />
                                            <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                                <p className={fullWidthLayoutStyle["quickLinks__link-title"]}>{title}</p>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    : <div className={fullWidthLayoutStyle.quickLinks__horizontalWithoutSlider} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={fullWidthLayoutStyle["quickLinks__link-container"]} style={{ display: record.length == 0 ? "none" : "" }}>
                            {record.map((item: any, index) => {
                                const title = item.Title.length > 12 ? item.Title.substring(0, 9) + "..." : item.Title;
                                const isOpenLinkInNewTab = item.OpenLinkInNewTab ? "_blank" : "_self";
                                const iconUrl = item.Icon == null ? defaultIcon : window.location.origin + JSON.parse(item.Icon).serverRelativeUrl;
                                return (
                                    <div className={fullWidthLayoutStyle["quickLinks__link-divWithoutSlider"]} style={{ backgroundColor: GenerateBackgroundColorBasedOnTextColor({ colorMode: 'dark' }) }}
                                        onClick={() => { window.open(item.RedirectURL.Url, isOpenLinkInNewTab); }} title={item.Title}>
                                        <img src={iconUrl} className={fullWidthLayoutStyle["quickLinks__link-icon"]} />
                                        <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}> {item.Title} </Tooltip>}>
                                            <p className={fullWidthLayoutStyle["quickLinks__link-title"]}>{title}</p>
                                        </OverlayTrigger>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
            }
        </div >
    )
}
