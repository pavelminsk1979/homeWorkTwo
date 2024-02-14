

import {body} from "express-validator";
import {DB} from "../../db/db";

const findValue=(value:string)=>{
   let blog= DB.blogs.find(e=>e.id===value)
    return blog?.id
}
export const blogIdValidationPosts = body('blogId')
    .exists()
    .trim()
    .custom((value) => value===findValue(value))
    .withMessage('Incorrect blogId')













/*

import {body} from "express-validator";
import {DB} from "../../db/db";


export const blogIdValidationPosts = body('blogId')
    .exists()
    .trim()
    .custom((value) => value===DB.blogs[0].id)
    .withMessage('Incorrect blogId')*/
