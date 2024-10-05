import {NextFunction, Response} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import mongoose from "mongoose";


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

    if (tickets.length === 0) {
        res.status(406).json({
            message: 'لطفا یک تیکت انتخاب کنید.',
        });
        return
    }
    try {
        // اینجا بعدا باید توکن رو ببینم و بر اساس یوزر آیدی تشخیص بدم آیا کاربر  ادمین کل هست؟ یا اینکه ادمنی دپارتمان هست و یا اینکه کاربر معمولی هست


        // خب بریم اول روی آرایه ی تیکت ها لوپ بزنیم
        //
        // اول دپارتمان
        // روی تیکت ها لوپ میزنم و دپارتمانشون رو عوض میکنم

        // تیکت که باید پر باشه. آرایه ای از تیکت هایی که قراره فروارد بشه ینی بره توی کالکشن تیکت های اختصاص داده شده
        // اگه کاربر داشت که با نوع اختصاص به کاربر ثبتش میکنم
        // اگه کاربر نداشت و دپارتمان داشت باید از نوه اختصاص به دپارتمان ثبتش کنم
        // همچنین باید توی خود تیکت بگم که آقا خود تیکت هم دپارتمان مقصدش عوض شده





        /////// قراره کد هایی پایین رو پاک کنم چون قدیمی هستن و اون موقع من جدول مربوط به تیکت های اختصاص داده شده رو نداشتم که وضعیت خواندن ور توش نگه دارم
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
                    ticketFound.assignToUserId = user
                }
                return await ticketFound.save();
            }));
            departmentTicketChange = true;
        }


        if (user !== '') {


            const foundUser: IUser | null = await User.findOne({_id: user}).exec();
            // نکته مهم: توی یوزر  تیکت آیدی ها رو به صورت استرینگی ذخیره میکنم
            if (foundUser) {
                const currentTickets = foundUser.tickets || []; // Ensure there's an array to work with
                const newTickets = req.body.tickets || []; // Assuming req.body.tickets contains the new tickets to add

                const newTicketsForDataBase = newTickets.map((row: { _id: any; }) => {

                    //const ticketId = typeof row._id === 'string' ? new mongoose.Types.ObjectId(row._id) : row._id;
                    const ticketId = typeof row._id === 'string' ? row._id : row._id.toString();


                    return {
                        ticketId,
                        readStatus: false,
                    }
                })


                //const uniqueTickets = new Set([...currentTickets, ...newTickets]);

                const allTickets = [...currentTickets, ...newTicketsForDataBase];


                const uniqueTickets: {
                    ticketId: string;
                    readStatus: boolean;
                }[] = [];

                allTickets.forEach((row, index) => {
                    const rowTicketId = row.ticketId?.toString()

                    // یه تیکت از بین همه تیکت ها دارم.

                    // اول نگاه میکنم اگه توی یونیک تیکت نبود باید بررسی کنم.
                    //اگه توی  یونیک تیکت بود که نیاز به بررسی نداره چون قبلا واسش وقت گذاشتیم
                    const isItInUniqueTickets = uniqueTickets.find(sr => sr?.ticketId?.toString === rowTicketId);


                    // اگه توی یونیک تیکت نبود.
                    if (!isItInUniqueTickets) {
                        const isItInNewTickets = newTicketsForDataBase.find((sr: {
                            ticketId: { toString: () => any; };
                        }) => sr.ticketId?.toString() === rowTicketId)

                        // میریم نگاه میکنیم آیا توی تیکت های  جدید هست؟
                        // اگه توی تیکت های جدید بود ادد میکنم توی آرایه یونیک

                        // make sure row._id  is an ObjectId
                        //const rowId = typeof row._id === 'string' ? new mongoose.Types.ObjectId(row._id) : row._id;
                        debugger
                        const rowId = typeof row.ticketId === 'string' ? row.ticketId : row?.ticketId?.toString();
                        if (!!isItInNewTickets) {
                            uniqueTickets.push({
                                ticketId: rowId,
                                readStatus: false,
                            })
                        } else {
                            //  اگه توی تیکت های جدید نبود. به صورت خوانده شده ادد میکنم توی آرایه یونیک
                            uniqueTickets.push({
                                ticketId: rowId,
                                readStatus: true,
                            })
                        }
                    }
                })
                debugger

                // اینجا باید بردارم  براساس تیکت آ دی  و وضهیت خوانده شدن یونیک کنم


                foundUser.tickets = Array.from(uniqueTickets)


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
