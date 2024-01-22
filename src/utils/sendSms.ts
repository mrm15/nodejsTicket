import axios from 'axios';

const sendSms = async (text: string, destinationNumber: string): Promise<boolean> => {
    const url = `https://niksms.com/fa/publicapi/groupsms?username=09126970541&password=Endj174622endj&numbers=${destinationNumber}&sendernumber=50002660&message=${text}`;

    try {
        const res = await axios.get(url);

        if (res?.data?.Status === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        return false;
    }
}

export { sendSms };
