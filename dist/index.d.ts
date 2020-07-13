declare const autoGroupStrings: (inputStrings: string[], { delimiter, direction, caseSensitive, }?: {
    delimiter: string;
    direction: "ltr" | "rtl";
    caseSensitive: boolean;
}) => {
    common: string;
    members: number[];
}[] | [];
export default autoGroupStrings;
