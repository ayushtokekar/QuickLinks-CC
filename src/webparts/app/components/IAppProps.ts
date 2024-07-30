import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAppProps {
  context: WebPartContext;
  componentTitle: string;
  listName: string;
  displayMode: any;
  noOfLinksToShow: number;
  componentHeight: number;
  seeAllPageURL: string;
  emptyMessage: string;
  showHideSeeAll: boolean;

  // GRID PROPERTIES
  gridLayout: any;
  customCSS: string;
  bgColor: string;
  seeAllPageUrl: any;

  refComponentLocationDetails: any
  tileColor: string;
  tileTextColor: string;
  hoverColor: string;
  iconDefaultColor: string;
}
