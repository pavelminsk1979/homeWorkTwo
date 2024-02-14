import {CreateAndUpdatePostModel} from "../models/CreateAndUpdatePostModel";
import {DB, Post} from "../db/db";


/*type Post = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}*/
/*
export const posts: Post[] = [
    {
        id: '77777',
        title: 'firstPosTtitle',
        shortDescription: 'firstPostShortDescription',
        content: 'firstPostContent',
        blogId: 'firstPostBlogId',
        blogName: 'firstPostBlogName',
    }
]
*/


export const postsRepository = {
    getPosts() {
        return DB.posts
    },

    findPostById(id: string) {
        const post = DB.posts.find(e => e.id === id)
        return post
    },


    createPost(requestBodyPost: CreateAndUpdatePostModel) {
        const {title, shortDescription, content, blogId} = requestBodyPost

        const newPost: Post = {
            id: (new Date()).toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'anyBlogName'
        }
        DB.posts.push(newPost)
        return newPost
    },


    updatePost(id: string, requestBodyPost: CreateAndUpdatePostModel) {

        const {title, blogId, content, shortDescription} = requestBodyPost

        const post = DB.posts.find(e => e.id === id)

        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        } else {
            return false
        }
    },


    deletePostById(id: string) {
        const indexPost = DB.posts.findIndex(e => e.id === id)
        if (indexPost === -1) {
            return false
        } else {
            DB.posts.splice(indexPost, 1)
            return true
        }
    }
}