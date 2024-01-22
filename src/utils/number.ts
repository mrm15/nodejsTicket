const generateLoginSms = (code: number): string => {
    return `کد ورود به پنل کاربری نمارنگ   ${code}\n\n`;
};

const loginCodeGenerator = (): number => {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { generateLoginSms, loginCodeGenerator };
