// Import all the required library in single place then as we required any component or library to access from here

import './Assets/Styles/bootstrap.min.css'; // Due to some conflict with SharePoint CSS, we need to update a row class that has been changed to a rows class in the bootstrap file

// Interface
import { IAppProps } from './webparts/app/components/IAppProps';

// Library
import { Spinner } from "office-ui-fabric-react";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "react-slick"; // npm i --save-dev @types/react-slick --force
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Services
import { spGetListItems } from './Services/SPService';
import { spCreateList } from './Services/SPListCreationService';


// Custom components
import HeaderLayoutOne from './CustomComponents/HeaderLayouts/HeaderLayoutOne/HeaderLayoutOne';
import { ErrorMessageLayoutTwo } from './CustomComponents/ErrorMessageLayout/ErrorMessageLayout';
import { FullWidthLayout } from './CustomComponents/QuickLinkLayouts/FullWidthLayout/FullWidthLayout';
import { GridLayout } from './CustomComponents/QuickLinkLayouts/GridLayout/GridLayout';
import { TileWithOnlyTitleLayout } from './CustomComponents/QuickLinkLayouts/TileWithOnlyTitleLayout/TileWithOnlyTitleLayout';
import { TileWithIconAndTitleLayout } from './CustomComponents/QuickLinkLayouts/TileWithIconAndTitleLayout/TileWithIconAndTitleLayout';
import { BulletLayout } from './CustomComponents/QuickLinkLayouts/BulletLayout/BulletLayout';
import { RectangleLayout } from './CustomComponents/QuickLinkLayouts/RectangleLayout/RectangleLayout';
import { TileWithIconLayout } from './CustomComponents/QuickLinkLayouts/TileWithIconLayout/TileWithIconLayout';

import { SpinnerLayout1 } from './CustomComponents/LoaderLayouts/SpinnerLayout/SpinnerLayout';

// images
const defaultIcon = require("./Assets/Images/DefaultIcon.svg");

// Utility
import { GenerateRandomColor, checkWhichSectionUseThisComp, GenerateBackgroundColorBasedOnTextColor } from './Utility/Utility';

export {
    IAppProps, Spinner, spGetListItems, spCreateList, ErrorMessageLayoutTwo, FullWidthLayout, GridLayout, TileWithOnlyTitleLayout, TileWithIconAndTitleLayout, BulletLayout, RectangleLayout, TileWithIconLayout, SpinnerLayout1, Scrollbars, HeaderLayoutOne, defaultIcon, Slider, Tooltip, OverlayTrigger, GenerateRandomColor, GenerateBackgroundColorBasedOnTextColor, checkWhichSectionUseThisComp
};