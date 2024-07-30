import { getSP } from './pnpJsConfiguration';
import { SPHttpClient, SPHttpClientResponse, HttpClient, HttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { createBatch } from '@pnp/sp/batching';

interface listItemProps {
    props: any;
    listName: string;
    select: string;
    expand: string;
    top: number;
    filterParameters: string;
    orderBy: string;
    orderByPosition: any;
}

const spGetListItems = async (allProps: listItemProps) => {
    const { props, listName, select = "*", expand = "no expand", top = 4999, filterParameters = "no filter", orderBy = "ID", orderByPosition = false } = allProps;
    const sp = await getSP(props.context);
    let result: any[];
    try {
        if (filterParameters == "no filter" && expand == "no expand") {
            result = await sp.web.lists.getByTitle(listName).items.orderBy(orderBy, orderByPosition).select(select).top(top)()
        }
        else if (filterParameters != "no filter" && expand == "no expand") {
            result = await sp.web.lists.getByTitle(listName).items.filter(filterParameters).orderBy(orderBy, orderByPosition).select(select).top(top)()
        }
        else if (filterParameters == "no filter" && expand != "no expand") {
            result = await sp.web.lists.getByTitle(listName).items.orderBy(orderBy, orderByPosition).select(select).top(top).expand(expand)()
        }
        else {
            result = await sp.web.lists.getByTitle(listName).items.filter(filterParameters).orderBy(orderBy, orderByPosition).select(select).top(top).expand(expand)()
        }
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}


const spGetItems = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, filterParameters, select, expand, top, orderBy, orderByPosition] = remainingProps;
    try {
        const result: any[] = await sp.web.lists.getByTitle(listName).items.filter(filterParameters).orderBy(orderBy, orderByPosition).select(select).top(top).expand(expand)()
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spGetItemsWithoutExpand = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, filterParameters, select] = remainingProps;
    try {
        const result: any[] = await sp.web.lists.getByTitle(listName).items.filter(filterParameters).select(select).top(4999)()
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spGetItemByID = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, itemId, select, expand] = remainingProps;
    try {
        const result: any[] = await sp.web.lists.getByTitle(listName).items.getById(itemId).select(select).expand(expand)()
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spAddItem = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, bodyPrepare] = remainingProps;
    try {
        const result = await sp.web.lists.getByTitle(listName).items.add(bodyPrepare);
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spUpdateItem = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, id, bodyPrepare] = remainingProps;
    try {
        const result = await sp.web.lists.getByTitle(listName).items.getById(id).update(bodyPrepare);
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spDeleteItem = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, Id] = remainingProps;
    try {
        const list = await sp.web.lists.getByTitle(listName).items.getById(Id).delete();
        return list;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

const spDeleteMultipleItems = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [listName, itemsBatch] = remainingProps;
    const result: any = [];
    const list = await sp.web.lists.getByTitle(listName);
    const [batchedListBehavior, execute] = createBatch(list);
    list.using(batchedListBehavior);
    for (var i = 0; i < itemsBatch.length; i++) {
        list.items.getById(itemsBatch[i].ID).delete().then(r => result.push(r));
    }
    await execute();
    return result;
}

// Get current site collection group members by group name 
const spGetGroupMembers = async (props: any, ...remainingProps: any) => {
    const sp = await getSP(props.context);
    const [groupName] = remainingProps;
    try {
        const result: any[] = await sp.web.siteGroups.getByName(groupName).users();
        return result;
    } catch (error) {
        const errorJson = await error.response.json();
        return errorJson;
    }
}

/*****************************************List Creation****************************************************/


export { spGetListItems, spGetItems, spAddItem, spUpdateItem, spDeleteItem, spGetGroupMembers, spGetItemsWithoutExpand, spDeleteMultipleItems, spGetItemByID };
