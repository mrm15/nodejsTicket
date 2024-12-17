export const validateTicketData = (ticketData: any): string => {
    let message = '';

    if (!ticketData.title || ticketData.title === '') {
        message += ' - عنوان خالی قابل قبول نیست';
    }

    if (!ticketData.description || ticketData.description === '') {
        message += ' - توضیحات خالی قابل قبول نیست';
    }

    if (!ticketData.files || ticketData.files.length === 0) {
        message += ' - هیچ فایلی ضمیمه نشده است';
    }

    if (!ticketData.firstReplyMessage || ticketData.firstReplyMessage.length === 0) {
        message += ' - هیچ توضیحی برای نام فایل درج نشده!';
    }

    return message;
};
