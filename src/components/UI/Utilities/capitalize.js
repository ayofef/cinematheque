/* AUTOMATICALLY CAPITALIZE THE FIRST LETTER OF THE GENRE DERIVED FROM URL */
export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
/* AUTOMATICALLY CAPITALIZE THE FIRST LETTER OF THE GENRE DERIVED FROM URL */