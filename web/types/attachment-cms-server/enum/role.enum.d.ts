export declare const Role: {
    readonly owner: "owner";
    readonly member: "member";
    readonly super: "super";
};
export declare type RoleType = typeof Role[keyof typeof Role];
