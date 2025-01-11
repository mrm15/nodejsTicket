import {mainArray} from "./mainArray";

export const productMapper = (productList: any[]) => {
    // اینجا اون آرایه اصلی رو میاریم و روی آیتم ها ساب منو  حلقه میزنیم تا دیتا رو در بیاریم
    const myMainArray = [...mainArray]
    myMainArray.forEach(mainRow => {
        // mainRow
        mainRow.subMenu.forEach(subMenuRow => {
            subMenuRow.items.forEach(itemsRow => {
                const foundProduct = productList.find(singleItem => singleItem.Code === itemsRow.Code)
                itemsRow = {
                    ...itemsRow,
                    ...foundProduct
                }
            })
        })
    })
    return myMainArray;
}