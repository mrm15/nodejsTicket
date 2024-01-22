const Products = require("../../models/products");

const calculateTotalPrice = async (tableData) => {
  let totalPrice = 0;

  for (const current of tableData) {
    const singleRow = await Products.findOne({ _id: current._id }).exec();
    const tempSum = parseFloat(current.number) * parseFloat(singleRow.price);
    totalPrice += tempSum;
  }

  return totalPrice;
};


module.exports = {calculateTotalPrice}