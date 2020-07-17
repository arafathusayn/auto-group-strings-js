declare const autoGroupStrings: (inputStrings: string[], { delimiter, direction, caseSensitive, includeSingleElementMembers, }?: {
    delimiter?: string | undefined;
    direction?: "ltr" | "rtl" | undefined;
    caseSensitive?: boolean | undefined;
    includeSingleElementMembers?: boolean | undefined;
}) => {
    common: string;
    members: number[];
}[] | [];
export default autoGroupStrings;
