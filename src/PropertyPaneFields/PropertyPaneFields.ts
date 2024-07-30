import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    IPropertyPaneGroup,
    PropertyPaneSlider,
    PropertyPaneChoiceGroup,
    PropertyPaneToggle,
    PropertyPaneLabel,
} from "@microsoft/sp-property-pane";
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export const propertyPaneFields = (allProperties: any, componentLocationDetails: any) => {
    // height field validation
    const validateHeight = (value: number): string => {
        if (value < 350) {
            return "Component height should be greater than or equal to 350";
        }
        return "";
    }
    // list name field validation
    const validateListName = (value: string): string => {
        if (value === null || value.trim().length === 0) {
            return "Please specify the list name here.";
        }
        return "";
    }



    // We you want to perform any action when change the color picker to write your logic into this function
    const onPropertyPaneFieldChanged = (response: any) => { }

    // hide show based on display mode option 
    let componentSeeAllPageURLFieldHideShow: any = "", componentTitleFieldHideShow: any = "", componentHeightFieldHideShow: any = "";
    if (allProperties.displayMode != "Horizontal") {
        componentTitleFieldHideShow = PropertyPaneTextField("componentTitle", { label: "Component title" });
        componentHeightFieldHideShow = PropertyPaneTextField("componentHeight", { label: "Height in px (e.g 350)", onGetErrorMessage: validateHeight.bind(this) });
        componentSeeAllPageURLFieldHideShow = PropertyPaneTextField('seeAllPageUrl', { label: "See all page URL (Site relative URL)" });
    }

    const generalSetting: IPropertyPaneGroup["groupFields"] = [
        componentTitleFieldHideShow,
        PropertyPaneTextField("listName", {
            label: "Assign a list name",
            onGetErrorMessage: validateListName.bind(this)
        }),

        PropertyPaneTextField("emptyMessage", {
            label: "Text, If no data is available",
        }),

        componentHeightFieldHideShow,
        componentSeeAllPageURLFieldHideShow

    ];

    const layoutSetting: IPropertyPaneGroup["groupFields"] = [
        PropertyPaneChoiceGroup("displayMode", {
            label: "Display mode",
            options: [
                {
                    key: "BulletView",
                    text: "Bullet View",
                },
                {
                    key: "Horizontal",
                    text: "Full Width",
                },
                {
                    key: "Grid",
                    text: "Grid",
                },
                {
                    key: "RectangleView",
                    text: "Rectangle View",
                },
                {
                    key: "TileWithIcon",
                    text: "Title with icon",
                },
                {
                    key: "TileWithIconAndTitle",
                    text: "Title with icon and title",
                },
                {
                    key: "TileWithOnlyTitle",
                    text: "Title with only title",
                },

            ],
        }),
    ];


    // color setting - hide show (blank variable value) based on display mode option 
    let bgColor: any = PropertyFieldColorPicker('bgColor', {
        label: 'Background color',
        selectedColor: allProperties.bgColor,
        onPropertyChange: onPropertyPaneFieldChanged,
        properties: allProperties,
        disabled: false,
        // debounce: 1000,
        isHidden: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Inline,
        iconName: 'Precipitation',
        key: 'colorFieldId'
    })

    let tileColor: any = PropertyFieldColorPicker('tileColor', {
        label: 'Tile color',
        selectedColor: allProperties.tileColor,
        onPropertyChange: onPropertyPaneFieldChanged,
        properties: allProperties,
        disabled: false,
        // debounce: 1000,
        isHidden: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Inline,
        iconName: 'Precipitation',
        key: 'colorFieldId'
    });

    let titleTextColor: any = PropertyFieldColorPicker('tileTextColor', {
        label: 'Tile text color',
        selectedColor: allProperties.tileTextColor,
        onPropertyChange: onPropertyPaneFieldChanged,
        properties: allProperties,
        disabled: false,
        // debounce: 1000,
        isHidden: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Inline,
        iconName: 'Precipitation',
        key: 'colorFieldId'
    })

    let hoverColor: any = PropertyFieldColorPicker('hoverColor', {
        label: 'Hover color',
        selectedColor: allProperties.hoverColor,
        onPropertyChange: onPropertyPaneFieldChanged,
        properties: allProperties,
        disabled: false,
        // debounce: 1000,
        isHidden: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Inline,
        iconName: 'Precipitation',
        key: 'colorFieldId'
    })

    let iconDefaultColor: any = PropertyFieldColorPicker('iconDefaultColor', {
        label: 'Icon default color',
        selectedColor: allProperties.iconDefaultColor,
        onPropertyChange: onPropertyPaneFieldChanged,
        properties: allProperties,
        disabled: false,
        // debounce: 1000,
        isHidden: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Inline,
        iconName: 'Precipitation',
        key: 'colorFieldId'
    })

    if (allProperties.displayMode == "BulletView") {
        tileColor = ""
        hoverColor = ""
        titleTextColor = PropertyFieldColorPicker('tileTextColor', {
            label: 'Text color',
            selectedColor: allProperties.tileTextColor,
            onPropertyChange: onPropertyPaneFieldChanged,
            properties: allProperties,
            disabled: false,
            // debounce: 1000,
            isHidden: false,
            alphaSliderHidden: false,
            style: PropertyFieldColorPickerStyle.Inline,
            iconName: 'Precipitation',
            key: 'colorFieldId'
        })
    } else if (allProperties.displayMode == "Horizontal") {
        tileColor = ""
        hoverColor = ""
        titleTextColor = ""
        // tileColor = PropertyPaneToggle('suggestQuestionHideShow', {
        //     label: 'Suggest a question',
        //     offText: "Hide",
        //     onText: "Show",
        //     checked: this.properties.suggestQuestionHideShow
        // }),
    }


    const colorSetting: IPropertyPaneGroup["groupFields"] = [
        bgColor,
        tileColor,
        titleTextColor,
        hoverColor,
        iconDefaultColor
    ];


    return (
        {
            displayGroupsAsAccordion: true,
            groups: [
                {
                    groupName: "General Settings",
                    isCollapsed: false,
                    groupFields: generalSetting,
                },
                {
                    groupName: "Layout Settings",
                    isCollapsed: true,
                    groupFields: layoutSetting,
                },
                {
                    groupName: "Color Settings",
                    isCollapsed: true,
                    groupFields: colorSetting,
                }

            ].filter(group => group !== null && group !== undefined)
        }
    )
}