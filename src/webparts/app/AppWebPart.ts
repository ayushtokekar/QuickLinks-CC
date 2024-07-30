import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import App from './components/App';
import { IAppProps } from './components/IAppProps';

import '../../Assets/Styles/LocalServerStyle.css';
import { propertyPaneFields } from '../../PropertyPaneFields/PropertyPaneFields';

export interface IAppWebPartProps {
  componentTitle: string;
  listName: string;
  displayMode: any;
  noOfLinksToShow: number;
  componentHeight: number;
  gridLayout: any;
  customCSS: string;
  seeAllPageURL: string;
  showHideSeeAll: boolean;
  emptyMessage: string;
  seeAllPageUrl: any;

  bgColor: string;
  tileColor: string;
  tileTextColor: string;
  hoverColor: string;
  iconDefaultColor: string;
}

export default class AppWebPart extends BaseClientSideWebPart<IAppWebPartProps> {
  public refComponentLocationDetails: React.RefObject<{ isFullWidthSectionUse: boolean, sectionColumnDetail: string, isAppPage: boolean }>;
  constructor() {
    super();
    this.refComponentLocationDetails = React.createRef();
  }
  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        context: this.context,
        componentTitle: this.properties.componentTitle,
        listName: this.properties.listName,
        displayMode: this.properties.displayMode,
        noOfLinksToShow: this.properties.noOfLinksToShow,
        componentHeight: this.properties.componentHeight,
        gridLayout: this.properties.gridLayout,
        customCSS: "",
        seeAllPageURL: this.properties.seeAllPageURL,
        emptyMessage: this.properties.emptyMessage,
        showHideSeeAll: this.properties.showHideSeeAll,
        bgColor: this.properties.bgColor,
        seeAllPageUrl: this.properties.seeAllPageUrl,
        refComponentLocationDetails: this.refComponentLocationDetails,
        tileColor: this.properties.tileColor,
        tileTextColor: this.properties.tileTextColor,
        hoverColor: this.properties.hoverColor,
        iconDefaultColor: this.properties.iconDefaultColor
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    //test

    // Default Value set of all the for the property pane fields
    this.properties.componentTitle = this.properties.componentTitle !== undefined ? this.properties.componentTitle : "Quick Links";
    this.properties.listName = this.properties.listName !== undefined ? this.properties.listName : "Quick Links";
    this.properties.displayMode = this.properties.displayMode !== undefined ? this.properties.displayMode : "Grid";
    this.properties.emptyMessage = this.properties.emptyMessage !== undefined ? this.properties.emptyMessage : "No data available";
    this.properties.seeAllPageUrl = this.properties.seeAllPageUrl !== undefined ? this.properties.seeAllPageUrl : "";
    this.properties.componentHeight = this.properties.componentHeight !== undefined ? this.properties.componentHeight : 350;
    this.properties.bgColor = this.properties.bgColor !== undefined ? this.properties.bgColor : "#ffffff";
    this.properties.tileColor = this.properties.tileColor !== undefined ? this.properties.tileColor : "#ff8fd0";
    this.properties.tileTextColor = this.properties.tileTextColor !== undefined ? this.properties.tileTextColor : "#000000";
    this.properties.hoverColor = this.properties.hoverColor !== undefined ? this.properties.hoverColor : "#1e1645";
    this.properties.iconDefaultColor = this.properties.iconDefaultColor !== undefined ? this.properties.iconDefaultColor : "#ff8fd0";

    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  // If you want to perform any action after clicking on edit icon of property pane to use this predefine method
  protected onPropertyPaneConfigurationStart(): void {
    super.onPropertyPaneConfigurationStart();

    // it could be help to refresh the property pane
    this.context.propertyPane.refresh();
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        propertyPaneFields(this.properties, this.refComponentLocationDetails.current)
      ]
    };
  }
}
