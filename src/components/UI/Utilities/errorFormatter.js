import {capitalize} from "./capitalize";

/* AUTOMATICALLY format error and capitalize */
export const errorFormat = (err) => {
    
    const processedError = capitalize(err.split("auth/")[1].split("-").join(" "));
    return processedError;
}
/* AUTOMATICALLY format error and capitalize */