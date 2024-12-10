export const getItem = (key, dflt) => {
    const value = localStorage.getItem(key)
    return value === null ? dflt : value
}