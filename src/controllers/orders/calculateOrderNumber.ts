const Order = require("../../models/orders");

const calculateOrderNumber = async (tableData) => {

  const allOrders = await Order.find({}).lean()

  const lastOrder = allOrders[allOrders.length - 1]
  debugger
  let orderNumber = 1000;
  if (lastOrder) {
    orderNumber = +lastOrder.orderNumber+1
  }
  return orderNumber;
};


module.exports = {calculateOrderNumber}