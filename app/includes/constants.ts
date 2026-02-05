import { ReactElement } from "react";
export const ROUTES = {
login:"/login",
forgotPassword:"/forgot-password",
dashboard:"/dashboard",
profile:"/dashboard/profile",
history:"/dashboard/history",
register:"/register",
terms:"/terms-and-conditions",
}
export interface RouteItem {
title:string;
icon?:string | ReactElement;
description?:string;
route?:string;
selected?:boolean;
value?:string;
} 
export const CONSTANT = {
    BaseURL:process.env.NODE_ENV === "development"?"http://localhost/awabah-api/v1/":"https://staging.awabah.com/v1/",
    LocalStore:{
        token:"token",
        baseUrl:"baseurl", 
        resetPassword:"resetPassword",
        remit:"remit",
        userFormFields:"userFormFields",
        historySection:"historySection"
    }
}
export const Currency = {
    symbol:"₦"
}
export const WindowEvents = {
    scheduleList:"scheduleList",
    microPensionList:"microPensionList"
}
export const COLOURS =  {
    green:"[#009668]",
    white:"white"
}

export const NairaSymbol = "₦";