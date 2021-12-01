export declare const Role: {
    readonly owner: "owner";
    readonly member: "member";
};
export declare type RoleType = typeof Role[keyof typeof Role];
