import { ApplicationEntity } from './application.entity';
import { PluginFile } from './plugin-file.entity';
export declare class Plugin extends ApplicationEntity<Plugin> {
    name: string;
    content: string;
    pluginFiles: PluginFile[];
}
