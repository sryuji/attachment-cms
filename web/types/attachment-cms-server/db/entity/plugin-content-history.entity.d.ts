import { ContentHistory } from './content-history.entity';
export declare class PluginContentHistory extends ContentHistory {
    constructor(attributes?: unknown);
    initialize(): void;
    pluginId: number;
}
