import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './App.module.scss';
import { IAppProps, Spinner, spGetListItems, spCreateList, ErrorMessageLayoutTwo, FullWidthLayout, GridLayout, checkWhichSectionUseThisComp, BulletLayout, SpinnerLayout1, TileWithOnlyTitleLayout, TileWithIconAndTitleLayout, RectangleLayout, TileWithIconLayout } from '../../../index';
import { HeaderLayoutOne} from '../../..';

export default (props: IAppProps) => {
  const { componentHeight = 350, listName, emptyMessage, displayMode, refComponentLocationDetails } = props;
  const [isLoader, setIsLoader] = useState(true);
  const [record, setRecord] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [componentHeightAdjustForLayout, setComponentHeightAdjustForLayout] = useState(displayMode === "Horizontal" ? "155px" : `${String(componentHeight)}px`);
  const refListName = useRef(listName);
  const refMainContainer = useRef(null);
  // const refComponentLocationDetails = useRef({ isFullWidthSectionUse: false, sectionColumnDetail: "", isAppPage: false })

  const defineListColumns = [
    {
      "Type": 'Url',
      "Title": "RedirectURL",
      "DisplayName": "Redirect URL",
      "Description": "",
      "IsRequiredField": true,
      "order": 1,
    },
    {
      "Type": 'Image',
      "Title": "Icon",
      "DisplayName": "Icon",
      "Description": "Recommended Size - 64px X 64px",
      "IsRequiredField": false,
      "order": 2,
    },
    {
      "Type": 'Number',
      "Title": "Sequence",
      "DisplayName": "Sequence",
      "Description": "Default value is 0 and it will appear on top. Change this if you want to change its order",
      "IsRequiredField": false,
      "IsShowAsPercentage": false,
      "DecimalPlace": "Automatic", //Allow only these value Automatic,1,2,3,4 and 5 in string format
      "DefaultValue": "0", // Value type should be string
      "order": 3
    },
    {
      "Type": 'YESNoCheckBox',
      "Title": "OpenLinkInNewTab",
      "DisplayName": "Open link in new tab",
      "Description": "",
      "IsRequiredField": false,
      "DefaultValue": 0, // Allow default value as a 0 = false or 1 = true
      "order": 4
    },
    {
      "Type": 'YESNoCheckBox',
      "Title": "IsActive",
      "DisplayName": "Is Active",
      "Description": "",
      "IsRequiredField": false,
      "DefaultValue": 1, // Allow default value as a 0 = false or 1 = true
      "order": 5
    },
  ]

  useEffect(() => {
    callFunction();
    refComponentLocationDetails.current = checkWhichSectionUseThisComp('quickLinkContainer');
  }, [])

  useEffect(() => {
    if (listName !== refListName.current) {
      refListName.current = listName;
      callFunction();
    }
  }, [listName])

  const callFunction = async () => {
    setErrorMessage("");
    setIsLoader(true);

    defineListColumns.sort((a, b) => String(a.order).localeCompare(String(b.order)));
    const response = await spCreateList({ props, listName: listName.trim(), listFieldsArray: defineListColumns, listBaseTemplate: 100, isCreateHiddenList: false });

    if (response == "list created successfully" || response == "list has been already exist") {
      getListItems();
    }
    else {
      setErrorMessage(response);
      setIsLoader(false);
    }
  }

  const getListItems = async () => {
    const select = "Title, RedirectURL, Icon, Sequence, IsActive, OpenLinkInNewTab";
    const top = 4999;
    const listName = props.listName.trim();
    const filterParameters = 'IsActive eq 1';
    const orderBy = "Sequence";
    const orderByPosition = true; // true = asc and false = dec

    // If you are not required any specific parameter to assign value as an undefined
    const response = await spGetListItems({ props, listName, top, select, expand: undefined, filterParameters: filterParameters, orderBy: orderBy, orderByPosition: orderByPosition });
    if (response !== undefined && response['odata.error'] == undefined) {
      response.length > 0 ? setRecord(response) : setErrorMessage(emptyMessage);
    } else {
      setErrorMessage(response['odata.error'].message.value);
    }

    setIsLoader(false);
  }

  const quickLinkLayoutCall = () => {
    
    if (displayMode == "BulletView") {
      return <BulletLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
    // Full width 
    else if (displayMode == "Horizontal") {
      return <FullWidthLayout record={record} props={props} componentLocationDetails={refComponentLocationDetails.current} refMainContainer={refMainContainer.current} />
    }
    else if (displayMode == "Grid") {
      return <GridLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
    else if (displayMode == "TileWithOnlyTitle") {
      return <TileWithOnlyTitleLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
    else if (displayMode == "TileWithIconAndTitle") {
      return <TileWithIconAndTitleLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
    else if (displayMode == "TileWithIcon") {
      return <TileWithIconLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
    else if (displayMode == "RectangleView") {
      return <RectangleLayout record={record} props={props} refMainContainer={refMainContainer.current} componentLocationDetails={refComponentLocationDetails.current} />
    }
  }

  // Handle component height according to layout or display mode
  useEffect(() => {
    if (displayMode == "Horizontal") {
      setComponentHeightAdjustForLayout("155px");
    }
    else if (displayMode == "Grid") {
      setComponentHeightAdjustForLayout(`${String(componentHeight)}px`);
    }
  }, [displayMode])


  return (
    <div id="quickLinkContainer" className={styles.mainContainer} ref={refMainContainer}>
            <HeaderLayoutOne headerTitle={props.componentTitle} seeAllLinkUrl={props.seeAllPageUrl} />

      {
        isLoader
          ? <SpinnerLayout1 props={props} height={componentHeightAdjustForLayout} label={"Please wait..."} labelPosition={"bottom"} />
          : errorMessage.length > 0
            ? <ErrorMessageLayoutTwo message={errorMessage} height={componentHeightAdjustForLayout} />
            : quickLinkLayoutCall()
      }
    </div>
  )
}
