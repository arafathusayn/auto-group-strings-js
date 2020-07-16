declare const autoGroupStrings: (inputStrings: string[], { delimiter, direction, caseSensitive, }?: {
    delimiter?: string | undefined;
    direction?: "ltr" | "rtl" | undefined;
    caseSensitive?: boolean | undefined;
}) => {
    common: string;
    members: number[];
}[] | [];
export default autoGroupStrings;
