
import {body} from "express-validator";
import {DB} from "../../db/db";


export const blogIdValidationPosts = body('blogId')
    .exists()
    .trim()
    .custom((value) => value===DB.blogs[0].id)
    .withMessage('Incorrect blogId')