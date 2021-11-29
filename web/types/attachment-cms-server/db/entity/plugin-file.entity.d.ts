import { ApplicationEntity } from './application.entity';
import { Plugin } from './plugin.entity';
export declare class PluginFile extends ApplicationEntity<PluginFile> {
    pluginId: number;
    plugin: Plugin;
    kind: string;
    url: string;
}
