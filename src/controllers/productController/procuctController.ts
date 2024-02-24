const Products = require("../../models/products");


const addNewProduct = async (req, res) => {


  // res.send(req.body)
  // return
  const product = new Products({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    unit: req.body.unit,
    price: req.body.price,
    number: 1,
  });

  try {
    const newProduct = await product.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.send({
      status: true,
      message: "کالا ثبت شد",
      newProduct
    })


  } catch (err) {
    res.send({
      status: false,
      message: err,
    })

  }
  // res.send(req.body.name)
}
const getProductList = async (req, res) => {
  const searchOptions = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};


  try {
    const products = await Products.find(searchOptions).populate('category').lean();
    products.forEach(v => {
      v.category = v.category.name || -1
    })


    res.send({
      status: true,
      data: products,
    });
  } catch (err) {
    res.send({
      status: false,
      data: [],
      message: err,
    });
  }
}


module.exports = {
  addNewProduct,
  getProductList
}