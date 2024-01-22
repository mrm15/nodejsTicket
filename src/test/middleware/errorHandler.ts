const {logEvents} = require("./logEvents")
const errorHandler = (err, req, res, next)=>{

  logEvents(`${err.name}:${err.message}`, 'errLog.txt').then(r =>{
    console.log('Mission Done!')
  })
  console.error(err.stack);
  res.status(500).send({
    message:err.message
  })
}

module.exports = errorHandler;