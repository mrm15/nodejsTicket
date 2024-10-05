import productListArray from "../../../controllers/hesabfaController/products.json"

interface ITemp {
    [key: string]: string
}

const productsObject: ITemp = {}
productListArray.forEach(singleProductObject => {
    productsObject[singleProductObject.Name] = singleProductObject.Name
})




export default productsObject