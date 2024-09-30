import { v4 as uuidV4 } from 'uuid';

const generateRandomUUID = (): string => {
    return uuidV4();
}

export default generateRandomUUID;
