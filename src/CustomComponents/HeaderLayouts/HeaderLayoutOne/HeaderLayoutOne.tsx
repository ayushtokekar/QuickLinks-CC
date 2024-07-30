import React from 'react'
import headerLayoutOneStyle from './HeaderLayoutOne.module.scss';

interface HeaderLayoutOneProps {
    headerTitle: string;
    seeAllLinkUrl: string;
}
const HeaderLayoutOne = (props: HeaderLayoutOneProps) => {
    const { headerTitle, seeAllLinkUrl } = props;
    return (
        <div className={headerLayoutOneStyle.quickLinksHeader}>
            <h3 className={`webPartHeading ${headerLayoutOneStyle.webPartHeading}`}>{headerTitle.trim()}</h3>
            {
                seeAllLinkUrl && seeAllLinkUrl.trim() !== "" &&
                <p className={headerLayoutOneStyle.quickLinksSeeAll} onClick={() => { window.open(seeAllLinkUrl, "_blank"); }}>See All</p>
            }
        </div>
    )
}

export default HeaderLayoutOne