const Order = require("../../models/orders");
const {calculateTotalPrice} = require("./calculateTotalPrice");
const {calculateOrderNumber} = require("./calculateOrderNumber");
const submitNewOrder = async (req, res) => {
  const {
    title: title,
    tableData: tableData,
    fileName: fileName,
    fileUrl: fileUrl,
    description: description,
    receiverId: receiverId

  } = req.body;


  const phoneNumber = req.userInfo.phoneNumber

  if (!title) return res.status(400).json({status: false, message: "عنوان را وارد کنید"});
  if (!phoneNumber) return res.status(400).json({status: false, message: "در توکن ارسالی شماره تماس وجود ندارد"});
  // if (!fileName) return  res.status(400).json({status: false, message: "نام فایل را وارد کنید"});
  // if (!fileUrl) return  res.status(400).json({status: false, message: "آدرس فایل را وارد کنید"});

  // insert to db
  //find Object Id  oh sender and reciver PHone Number
  try {
    const totalPrice = await calculateTotalPrice(tableData)

    const orderNumber= await calculateOrderNumber();
    const order = new Order({
      // senderId: phoneNumber,
      // receiverId: phoneNumber,
      orderNumber,
      title,
      tableData,
      fileName ,
      fileUrl ,
      description,
      totalPrice,
    });

    const newOrder = await order.save();

    res.send({
      status: true, message: "سفارش با موفقیت ثبت شد", data: newOrder
    })
  } catch (err) {
    res.send({
      status: false, message: err,
    })
  }
}


module.exports = {
  submitNewOrder
}