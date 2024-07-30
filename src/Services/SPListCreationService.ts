// import { CalendarType, DateTimeFieldFormatType, DateTimeFieldFriendlyFormatType, FieldUserSelectionMode, UrlFieldFormatType } from "@pnp/sp/fields/types";
import { getSP } from './pnpJsConfiguration';
import { GenerateGUID } from '../Utility/Utility';
// Base Template
// List - 100 and Library - 101
let lookupListResponse: any = null;

// Use defineListColumns variable to define column type as your requirement
// No need to define Title column because that column automatically generated 
const defineListColumns = [
    // Text
    {
        "Type": 'Text',
        "Title": "TestingText",
        "DisplayName": "Testing Text",
        "Description": "Testing Text description",
        "IsRequiredField": true,
        "order": 1
    },
    // MultiLinePlainText
    {
        "Type": 'MultiLinePlainText',
        "Title": "MultiLinePlanText",
        "DisplayName": "Multi Line Plan Text",
        "Description": "MultiLinePlanText Description",
        "IsRequiredField": true,
        "order": 2
    },
    // MultiLineEnhancedRichText
    {
        "Type": 'MultiLineEnhancedRichText',
        "Title": "MultiLineEnhancedRichText",
        "DisplayName": "MultiLine Enhanced Rich Text",
        "Description": "MultiLineEnhancedRichText description",
        "IsRequiredField": true,
        "order": 3
    },
    // Choice
    {
        "Type": 'Choice',
        "Title": "RadioButtonsChoice",
        "DisplayName": "Radio Buttons Choice",
        "Description": "Radio Buttons Choice description",
        "IsRequiredField": true,
        "Format": "RadioButtons", // Allow to use two format 1. RadioButtons and 2. DropDownMenu
        "ChoiceOptions": ["Male", "Female", "Other"],
        "order": 5
    },
    // MultiChoice
    {
        "Type": 'MultiChoice',
        "Title": "RadioButtonsMultipleChoice",
        "DisplayName": "Radio Buttons Multiple Choice",
        "Description": "Radio Buttons Multiple Choice description",
        "IsRequiredField": true,
        "ChoiceOptions": ["Male", "Female", "Other"],
        "order": 6
    },
    // Number
    {
        "Type": 'Number',
        "Title": "NumberField",
        "DisplayName": "Number Field",
        "Description": "Number Field description",
        "IsRequiredField": true,
        "IsShowAsPercentage": false,
        "DecimalPlace": "Automatic", //Allow only these value Automatic,1,2,3,4 and 5 in string format,
        "DefaultValue": "0", // Value type should be string
        "order": 7
    },
    // DateAndTime
    {
        "Type": 'DateAndTime',
        "Title": "DateOnly",
        "DisplayName": "Date Only Field",
        "Description": "Date Only Field description",
        "IsRequiredField": true,
        "Format": "DateOnly", // Allow only two type of format 1. DateOnly 2. DateTime
        "order": 8,
        "IsRequiredTodayDateAsDefault": false
    },
    // YES/No (CheckBox)
    {
        "Type": 'YESNoCheckBox',
        "Title": "YESNoCheckBox",
        "DisplayName": "YES No Check Box Field",
        "Description": "YES No Check Box Field description",
        "IsRequiredField": true,
        "DefaultValue": 1, // Allow default value as a 0 or 1
        "order": 9,
    },
    // People
    {
        "Type": 'People',
        "Title": "PeopleOnlyUser",
        "DisplayName": "PeopleOnlyUser Field",
        "Description": "PeopleOnlyUser Field description",
        "IsRequiredField": true,
        "AllowSelection": "PeopleOnly", // Allow two type of section to fetch data accordingly 1. PeopleOnly and 2. PeopleAndGroups
        "order": 9,
    },
    //  MultiplePeople
    {
        "Type": 'MultiplePeople',
        "Title": "MultiplePeopleUser",
        "DisplayName": "MultiplePeopleUser Field",
        "Description": "MultiplePeopleUser Field description",
        "IsRequiredField": true,
        "AllowSelection": "PeopleOnly", // Allow two type of section to fetch data accordingly 1. PeopleOnly and 2. PeopleAndGroups
        "order": 9,
    },
    // Url
    {
        "Type": 'Url',
        "Title": "Url",
        "DisplayName": "Url Field",
        "Description": "Url Field description",
        "IsRequiredField": true,
        "order": 9,
    },
    // Image
    {
        "Type": 'Image',
        "Title": "Image",
        "DisplayName": "Image Field",
        "Description": "Image Field description",
        "IsRequiredField": true,
        "order": 9,
    },
    // Lookup
    {
        "Type": 'Lookup',
        "Title": "Lookup field",
        "DisplayName": "Lookup Field",
        "Description": "Lookup Field description",
        "IsRequiredField": true,
        "AssociatedListName": "LookupList",
        "IsAllowMultipleValueInLookup": true,
        "order": 9,
    }
]

interface listCreationProps {
    props: any;
    listName: string;
    listFieldsArray: Array<any>;
    listBaseTemplate: number;
    isCreateHiddenList: boolean;
}

export const spCreateList = async (allProps: listCreationProps) => {
    lookupListResponse = null;
    const { props, listFieldsArray, listName, listBaseTemplate = 100, isCreateHiddenList = false } = allProps;
    const sp = await getSP(props.context);
    // Start - List Create part ---------------------------------

    // ensure that a list exists. If it doesn't it will be created with the provided title (the rest of the settings will be default):
    const listEnsureResult = await sp.web.lists.ensure(listName, '', listBaseTemplate, undefined, { Hidden: isCreateHiddenList, EnableAttachments: false, });
    // check if the list was created, or if it already existed:
    const isListCreated = (listEnsureResult.created) ? true : false;

    // End - List Create part ---------------------------------

    if (isListCreated) {
        //Start - Check and create lookup list
        const filterLookupType = listFieldsArray.filter((item) => item.Type?.toLowerCase() == "lookup");
        if (filterLookupType.length > 0) {
            const { AssociatedListName } = filterLookupType[0];
            // ensure that a list exists. If it doesn't it will be created with the provided title (the rest of the settings will be default):
            lookupListResponse = await sp.web.lists.ensure(`${AssociatedListName}_${listName}`, '', listBaseTemplate, undefined, { Hidden: isCreateHiddenList, EnableAttachments: false, });
        }
        //End- Check and create lookup list

        // Start - list fields create -----------------------------
        await CreateListFieldsInSP(props, listFieldsArray, listName);
        // End - list fields create -------------------------------

        // Start - default view set -----------------------------
        await setListDefaultView(props, listFieldsArray, listName);
        // End - default view set -------------------------------

        //  Start - Rename the display name with space --------- 
        // await renameColumnName(props, listName, listFieldsArray); // unable to update multiple column name
        //  End - Rename the display name with space -----------

        return "list created successfully";
    }
    else {
        // Get all fields in the list
        const fields = await sp.web.lists.getByTitle(listName).fields();
        const filterFieldsExistOrNot = fields.filter((item) => {
            // Check if any object in listFieldsArray has the same Title as the current item
            return listFieldsArray.some(filterItem => filterItem.Title === item.StaticName);
        })
        return filterFieldsExistOrNot.length == listFieldsArray.length ? "list has been already exist" : `The '${listName}' list does not have matching fields/columns as required. Please provide the correct list name or assign an unique list name.`
    }
}

const CreateListFieldsInSP = async (props: any, fields: any[], listName: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {
        try {
            const sp = await getSP(props.context);
            const [batchedSP, execute] = sp.batched();
            for (var i = 0; i < fields.length; i++) {
                let { Type } = fields[i];

                let schemaXml: any = await prepareColumnSchemaXml(fields[i], props, "create");
                switch (Type) {
                    case 'Text':
                        // batchedSP.web.lists.getByTitle(listName).fields.addText(Title, { MaxLength: 255, Description: Description, Required: IsRequiredField });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml)
                        break;
                    case 'MultiLinePlainText':
                        // batchedSP.web.lists.getByTitle(listName).fields.addMultilineText(Title, { Description: Description, Required: IsRequiredField, NumberOfLines: 6, RichText: true, RestrictedMode: false, AppendOnly: false, AllowHyperlink: true });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml)
                        break;
                    case 'MultiLineEnhancedRichText':
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'Choice':
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'MultiChoice':
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'Number':
                        // batchedSP.web.lists.getByTitle(listName).fields.addNumber(Title, { MinimumValue: 1, MaximumValue: 100, Description: Description });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'DateAndTime':
                        // batchedSP.web.lists.getByTitle(listName).fields.addDateTime(
                        //     Title, { DisplayFormat: DateTimeFieldFormatType.DateOnly, DateTimeCalendarType: CalendarType.Gregorian, FriendlyDisplayFormat: DateTimeFieldFriendlyFormatType.Disabled }
                        // );

                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'YESNoCheckBox':
                        // batchedSP.web.lists.getByTitle(listName).fields.addBoolean(Title, {});
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'People':
                        // batchedSP.web.lists.getByTitle(listName).fields.addUser(Title, { SelectionMode: FieldUserSelectionMode.PeopleOnly });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'MultiplePeople':
                        // batchedSP.web.lists.getByTitle(listName).fields.addUser(Title, { SelectionMode: FieldUserSelectionMode.PeopleAndGroups });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'Url':
                        // batchedSP.web.lists.getByTitle(listName).fields.addUrl(Title, { DisplayFormat: UrlFieldFormatType.Hyperlink, Required: IsRequiredField });
                        // Format="Image"
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'Image':
                        // batchedSP.web.lists.getByTitle(listName).fields.addImageField(Title, { Description: Description });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    case 'Lookup':
                        // batchedSP.web.lists.getByTitle(listName).fields.addImageField(Title, { Description: Description });
                        batchedSP.web.lists.getByTitle(listName).fields.createFieldAsXml(schemaXml);
                        break;
                    default:
                        break;
                }
            }
            execute().then(async (response) => {
                res(true);
            })
        }
        catch (ex) {
            res(false);
        }
    })
}

const setListDefaultView = async (props: any, fields: any[], listName: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {
        try {
            const sp = await getSP(props.context);
            const [batchedSP, execute] = sp.batched();
            for (var i = 0; i < fields.length; i++) {
                let { Title } = fields[i];
                // batchedSP.web.lists.getByTitle(listName).fields.addText(Title, { MaxLength: 255, Description: Description, Required: IsRequiredField });
                batchedSP.web.lists.getByTitle(listName).defaultView.fields.add(Title);
            }
            execute().then(async (response) => {
                res(true);
            })
        }
        catch (ex) {
            res(false);
        }
    })
}

const renameColumnName = async (props: any, listName: string, listFieldsArray: any) => {
    let intervalId = undefined;
    try {
        let sp = await getSP(props.context);
        const allResponse = await Promise.all(listFieldsArray.forEach(async (item: any) => {
            const { Title, DisplayName } = item;

            let schemaXml = await prepareColumnSchemaXml(item, props, "update");

            intervalId = setInterval(async () => {
                // Make the PATCH request to update the field schema XML
                let response: any = await sp.web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(Title).update({
                    SchemaXml: schemaXml
                });
                return Promise.resolve(response);
            }, 5000);
        }))

        clearInterval(intervalId);


    } catch (error) {
        clearInterval(intervalId);
        console.error("Error:", error);
    }
}

const prepareColumnSchemaXml = async (currentItems: any, props: any, actionMode: string) => {
    const { Title, Type, IsRequiredField, Description, DisplayName, Format, ChoiceOptions, IsShowAsPercentage, DecimalPlace, IsRequiredTodayDateAsDefault, DefaultValue = 1, AllowSelection, IsAllowMultipleValueInLookup = false } = currentItems;

    let updatedDisplayName = actionMode === "create" ? Title : DisplayName;

    switch (Type) {
        case 'Text':
            return `<Field Type="Text" Name="${Title}" DisplayName="${updatedDisplayName}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" MaxLength="255" Description="${Description}"/>`

        case 'MultiLinePlainText':
            return `<Field Type="Note" Name="${Title}" DisplayName="${updatedDisplayName}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" Description="${Description}" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="6" RichText="FALSE" AppendOnly="FALSE" Sortable="FALSE" CustomFormatter="" RestrictedMode="TRUE" RichTextMode="Compatible" IsolateStyles="FALSE"/>`


        case 'MultiLineEnhancedRichText':
            return `<Field Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Type="Note"  NumLines="6" RichText="TRUE" RichTextMode="FullHtml" Required="${IsRequiredField ? "TRUE" : "FALSE"}" />`


        case 'Choice':
            let prepareChoiceOptions = "";
            ChoiceOptions.map((item: any) => prepareChoiceOptions += `<CHOICE>${item}</CHOICE>`);
            return `<Field Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Type="Choice" Format="${Format}" Required="${IsRequiredField ? "TRUE" : "FALSE"}">
                    <CHOICES>${prepareChoiceOptions}</CHOICES>  
                </Field>`

        case 'MultiChoice':
            let prepareMultipleChoiceOptions = "";
            ChoiceOptions.map((item: any) => prepareMultipleChoiceOptions += `<CHOICE>${item}</CHOICE>`);
            // <Default>Golf</Default>
            return `<Field Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Type="MultiChoice" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" Indexed="FALSE" FillInChoice="FALSE">
                    <CHOICES>
                      ${prepareMultipleChoiceOptions}
                    </CHOICES>
                </Field>`

        case 'Number':
            return `<Field Type="Number" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" Indexed="FALSE" Percentage="${IsShowAsPercentage ? "TRUE" : "FALSE"}" Decimals="${DecimalPlace}">
                    <Default>${DefaultValue}</Default>
                </Field>`

        case 'DateAndTime':
            let defaultValue = IsRequiredTodayDateAsDefault ? "<Default>[today]</Default>" : "";
            return `<Field Type="DateTime" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="${Format}" FriendlyDisplayFormat="Disabled">
                   ${defaultValue}
                </Field>`

        case 'YESNoCheckBox':
            return `<Field Type="Boolean" Name="${Title}"  Title="${updatedDisplayName}" DisplayName="${Title}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" Indexed="FALSE">
                    <Default>${DefaultValue}</Default>
                </Field>`

        case 'People':
            return `<Field Type="User" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" List="UserInfo"  EnforceUniqueValues="FALSE" ShowField="ImnName" UserSelectionMode="${AllowSelection}" UserSelectionScope="0" StaticName="${Title}" />`

        case 'MultiplePeople':
            return `<Field Type="UserMulti" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" List="UserInfo" EnforceUniqueValues="FALSE" ShowField="ImnName" UserSelectionMode="${AllowSelection}" UserSelectionScope="0" AllowDeletion="TRUE" Mult="TRUE" Sortable="FALSE" StaticName="${Title}"/>`

        case 'Url':
            return ` <Field Type="URL" Name="${Title}" StaticName="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="Hyperlink" />`

        case 'Image':
            return ` <Field Type="Thumbnail" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" StaticName="${Title}"/>`

        case 'Lookup':
            let sp = await getSP(props.context);
            const web = await sp.web.select("Id")();
            const webId = web.Id;
            return ` <Field Type="${IsAllowMultipleValueInLookup ? "LookupMulti" : "Lookup"}" Name="${Title}" DisplayName="${updatedDisplayName}" Description="${Description}" Required="${IsRequiredField ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" List="${lookupListResponse.data.Id}" WebId="${webId}" Mult="TRUE" ShowField="Title" DisplayNameSrcField="Title" StaticName="${Title}"/>`
        default:
            break;
    }
}