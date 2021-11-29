import { PluginFileDto } from './plugin-file.dto';
export declare class PluginDto {
    id?: number;
    name: string;
    content?: string;
    pluginFiles: PluginFileDto[];
}
