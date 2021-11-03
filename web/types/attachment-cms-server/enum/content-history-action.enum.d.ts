export declare const ContentHistoryAction: {
    readonly innerHTML: "innerHTML";
    readonly remove: "remove";
    readonly insertBefore: "insertBefore";
    readonly insertChildAfterBegin: "insertChildAfterBegin";
    readonly insertChildBeforeEnd: "insertChildBeforeEnd";
    readonly insertAfter: "insertAfter";
};
export declare type ContentHistoryActionType = typeof ContentHistoryAction[keyof typeof ContentHistoryAction];
