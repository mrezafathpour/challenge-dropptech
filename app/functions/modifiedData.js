import { GetFromCookie } from "./cookieManager";


const ModifiedData = (data, pageName) => {
    const favorites = GetFromCookie('inFav');
    const basket = GetFromCookie('inBasket');
    let newData = data.map(obj => ({
        ...obj,
        inFav: favorites.includes(obj.id),
        inBasket: basket.includes(obj.id),
    }));
    if (pageName === 'favorites') {
        newData = newData.filter(obj => obj.inFav === true);
    }
    if (pageName === 'basket') {
        newData = newData.filter(obj => obj.inBasket === true);
    }
    return newData;
}


export default ModifiedData;