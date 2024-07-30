import { spfi, SPFI, SPFx } from '@pnp/sp'; // npm i @pnp/sp@3.24.0
import { WebPartContext } from "@microsoft/sp-webpart-base";
import '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/batching';
import "@pnp/sp/site-groups";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/sharing";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/web";
import "@pnp/sp/sputilities";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";

export const getSP = (context: WebPartContext) => {
    const sp = spfi().using(SPFx(context))
    return sp;
}