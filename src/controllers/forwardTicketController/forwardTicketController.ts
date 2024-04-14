import {NextFunction, Response} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";


const forwardTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;

    // اینجا باید سه تا مقدار بیاد

    //اولی نام کاربری هست که تیکت باید براش ارسال بشه
    // دومی دپارتمانی هست که باید تیکت براش ارسال بشه
    // سومی مشخصات تیکتی هست که باید بیاد سمت ما

    // ما باید اول چک کنیم و تایید بگیری مه ایشون میتونه تیکت ها رو فروراد کنه
    // که چک کردن اینکه آیا کاربر میتونه تیکت فروارد کنه یا نه رو بعدا انجام میدم. و خیلی مهمه

    //و در ادامه تیکت رو به لیست تیکت های کاربر اضافه میکنم.
    //

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    let {
        tickets,
        department,
        user,
    } = req.body;


    try {
        // اینجا بعدا باید توکن رو ببینم و بر اساس یوزر آیدی تشخیص بدم آیا کاربر  ادمین کل هست؟ یا اینکه ادمنی دپارتمان هست و یا اینکه کاربر معمولی هست


        // خب بریم اول روی آرایه ی تیکت ها لوپ بزنیم
        //
        //  اول دپارتمان
        // روی تیکت ها لوپ میزنم و دپارتمانشون رو عوض میکنم


        let departmentTicketChange = false
        let userTicketChange = false;
        if (!department && !user) {
            res.status(406).json({
                message: 'باید حتما  نام  یا دپارتمان را انخاب کنید.',
            });
            return
        }

        if (department !== '') {
            const departmentId = department
            const myList = await Promise.all(tickets.map(async (singleTicket: ITicket) => {

                const row: any = {...singleTicket};
                const ticketFound: ITicket = (await Ticket.findOne({_id: row._id}).exec())!;
                ticketFound.assignedToDepartmentId = departmentId
                if (user !== '') {
                    ticketFound.assignToUserId =  user
                }
                return await ticketFound.save();
            }));
            departmentTicketChange = true;
        }


        if (user !== '') {


            const foundUser: IUser | null = await User.findOne({_id: user}).exec();

            if (foundUser) {
                const currentTickets = foundUser.tickets || []; // Ensure there's an array to work with
                const newTickets = req.body.tickets || []; // Assuming req.body.tickets contains the new tickets to add

                // Combine the current tickets with the new ones, and convert to a Set to ensure uniqueness
                const uniqueTickets = new Set([...currentTickets, ...newTickets]);

                // Convert the Set back to an array
                foundUser.tickets = Array.from(uniqueTickets);

                const result = await foundUser.save(); // Save the updated user document
            }
            userTicketChange = true
        }

        const message = (userTicketChange && departmentTicketChange) ?
            'سفارش های کاربر و دپارتمان ارجاع شد.' :
            departmentTicketChange ?
                'سفارش های دپارتمان ارجاع شد' :
                userTicketChange ?
                    'سفارش های کاربر ارجاع شد' :
                    'هیچ تغییری انجام نشد!!!!!☹️';
        res.status(200).json({
            message
        });
        return

    } catch (error) {
        res.status(500).json({
            message: error?.toString(),
            error
        });
        return
    }


};

export {forwardTicketController};
