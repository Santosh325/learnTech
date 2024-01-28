import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setLoading, setUser } from "../../slices/authSlice";
import { logout } from "./authAPI";
import {profileEndpoints} from "../apis"

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("loading...");
    let result = [];
    try {
         
        const response = await apiConnector(
            "GET", 
            GET_USER_ENROLLED_COURSES_API, 
            null,
            {
                Authorisation: `Bearer ${token}`
            }
            
            );
    console.log("After Calling BACKEND API fro enrolled courses api .....", response);

    if(!response.data.success) {
        throw new Error(response.data.message);
    }
   
    result = response.data.data;

    } catch(error) {
        console.log("GET_USER_ENROLLED_COURSES_API api error......", error);
        toast.error("Could not get enrolled courses");
    }
    toast.dismiss(toastId);
    return   result;
}