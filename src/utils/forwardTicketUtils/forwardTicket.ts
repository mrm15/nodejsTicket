const forwardTicket = async ({ticketArray, departmentId, userId}:any) => {


    console.log({ticketArray, departmentId, userId})

    return {
        status: true,
        message: "تیکت ها با موفقیت ارجاع شدند"
    }
}
export default forwardTicket