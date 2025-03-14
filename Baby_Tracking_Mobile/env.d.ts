declare module '@env'{
    //BASE API
    export const API_LOCAL_URL: string;
    export const API_HOST_URL: string;

    //USER
    export const API_PUT_USER_UNBAN: string;
    export const API_PUT_USER_BAN: string;
    export const API_PUT_USER_ACTIVATE: string;
    export const API_POST_USER_VERIFY: string;
    export const API_POST_USER_RESET_PASSWORD: string;
    export const API_POST_USER_REGISTER: string;
    export const API_POST_USER_UPDATE: string;
    export const API_POST_USER_UPDATE_PASSWORD: string;
    export const API_POST_USER_FORGOT_PASSWORD: string;
    export const API_POST_USER_ADD_DOCTOR: string;
    export const API_GET_USER_P: string;
    export const API_GET_USER_GETALL: string;
    export const API_DELETE_USER_DEACTIVE: string;

    //MEMBER SHIP PACKAGE
    export const API_PUT_MEMBERSHIP_UPDATE_ID: string;
    export const API_PUT_MEMBERSHIP_ENABLE_ID: string;
    export const API_PUT_MEMBERSHIP_DISABLE_ID: string;
    export const API_POST_MEMBERSHIP_PAYMENT_MEMBERSHIPID: string;
    export const API_POST_MEMBERSHIP_CREATE: string;
    export const API_GET_MEMBERSHIP_ID: string;
    export const API_GET_MEMBERSHIP_PERMISSION: string;
    export const API_GET_MEMBERSHIP_MY_PACKAGE: string;
    export const API_GET_MEMBERSHIP_LIST: string;
    export const API_GET_MEMBERSHIP_EXCUTE: string;
    export const API_DELETE_MEMBERSHIP_ID: string;

    //GROWTH TRACKER
    export const API_PUT_GROW_TRACKER_CHILDID: string;
    export const API_DELETE_GROW_TRACKER_CHILDID: string;
    export const API_GET_GROW_TRACKER_CHILDID: string;
    export const API_POST_GROW_TRACKER_CHILDID: string;
    export const API_GET_GROW_TRACKER_CHILDID_PREDICT_NEXT: string;

    //WORKING SCHEDULE
    export const API_POST_WORKING_SCHEDULE_REGISTER: string;

    //SLOT TIME
    export const API_POST_SLOT_TIME_ADD: string;
    export const API_GET_SLOT_TIME_ALL: string;

    //CONSULTION REQUEST
    export const API_POST_CONSULTION_REQUEST: string;

    //CHILDREN 
    export const API_POST_CHILDREN_ADD: string;
    export const API_GET_CHILDREN_LIST: string;
    export const API_GET_CHILDRED_INFO_CHILDID: string;
    export const API_DELETE_CHILDREN_CHILDID:string;

    //AUTHENTICATE
    export const API_POST_AUTH_LOGIN: string;

    //FILE
    export const API_POST_IMPORT_UNDER: string;
    export const API_POST_IMPORT_GREATER: string;

    //STANDARD INDEX
    export const API_GET_STANDARD_INDEX: string;

}