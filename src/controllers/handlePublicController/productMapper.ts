import {mainArray} from "./mainArray";

export const productMapper = (productList: any[]) => {
    // اینجا اون آرایه اصلی رو میاریم و روی آیتم ها ساب منو  حلقه میزنیم تا دیتا رو در بیاریم
    const myMainArray = [...mainArray]
    myMainArray.forEach(mainRow => {
        mainRow.subMenu.forEach(subMenuRow => {
            subMenuRow.items.forEach(itemRow => {
                const foundProduct = productList.find(singleItem => singleItem.Code === itemRow.Code) || null;
                if (foundProduct) {
                    Object.assign(itemRow, foundProduct); // Updates `itemRow` properties directly
                }
            })
        })
    })
    return myMainArray;
}