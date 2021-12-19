import { ContentDto } from './types/content.dto';
import { AttachmentConfigType, ContentsResponse } from './types/global';
export declare const BASE_HTML_ID = "acms-content";
export declare const ACMS_EXTENSION_KEY = "acmsExtension";
export declare function getLoadedStatus(): undefined | 'official' | 'extension';
export declare class AttachmentCMS {
    private baseUrl;
    private defaultToken;
    private queryToken;
    private contents;
    private id;
    private contentsResponse;
    private throttleApplyContents;
    private isExtension;
    constructor(options: AttachmentConfigType);
    get isServer(): boolean;
    get url(): string;
    get token(): string;
    run(): Promise<void>;
    load(data: ContentsResponse): void;
    pick(id: number): ContentDto;
    private markAttachmentType;
    private getQueryToken;
    private showLimitedMode;
    private fetchContents;
    private extractMatchedContents;
    private calcContentIndex;
    private observeElement;
    private applyContents;
    private removeElement;
    private insertBeforeElement;
    private insertFirstChildToElement;
    private insertLastChildToElement;
    private insertAfterElement;
    private observeHistoryState;
}
//# sourceMappingURL=attachment-cms.d.ts.map