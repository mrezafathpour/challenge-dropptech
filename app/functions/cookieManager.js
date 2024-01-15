
import Cookies from 'js-cookie';
// Cookies.get(key)._expires

// Function to get an array of IDs from a cookie
export const GetFromCookie = (key) => {
    const cookieValue = Cookies.get(key);
    return cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : [];
};

// Function to add an ID to the existing array in the cookie
export const UpdateCookie = (key, newId, duration) => {
    const existingIds = GetFromCookie(key);
    const updatedIds = [...existingIds, newId];
    Cookies.set(key, JSON.stringify(updatedIds), { expires: duration });
};

// Function to set an array of IDs in a cookie
export const AddCookie = (key, id, duration = 7) => {
    if ((GetFromCookie(key)).length > 0) {
        UpdateCookie(key, id, duration);
    }
    else {
        const newArray = [];
        newArray[0] = id;
        Cookies.set(key, JSON.stringify(newArray), { expires: duration });
    }
};

// Function to remove an ID from the existing array in the cookie
export const RemoveCookie = (key, idToRemove, duration = 7) => {
    const existingIds = GetFromCookie(key);
    const updatedIds = existingIds.filter(id => id !== idToRemove);
    if (updatedIds.length > 0) {
        Cookies.set(key, JSON.stringify(updatedIds), { expires: duration });
    } else Cookies.remove(key);

};