import axios from "axios";
import {IUser, User} from "../models/User";

export const myLovelyFunction = async ()=>{


    const allUsers : IUser[]  | null= await User.find({}).lean();
    if(allUsers){

        // console.log("============================")
        // console.log(allUsers.length)
        // console.log("============================")

    }else{
        // console.log("============================")
        // console.log("Done");
    }



}