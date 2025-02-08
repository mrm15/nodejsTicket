// here are some used Roles Access List To manage Where caches Are use In WebSite
import {getRoleAccessList} from "../../controllers/LoginRegisterSms/getRoleAccessList";

const cacheKeyNames = {
    // get  and set and delete when will delete when user update , role update. role delete
    getRoleAccessList: "getRoleAccessList",
    // "roleAccessList":"roleAccessList",
}
export default cacheKeyNames