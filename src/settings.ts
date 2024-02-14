import express, {Request, Response} from 'express'
import { videosRoute} from "./routes/videos-route";
import {blogsRoute} from "./routes/blogs-route";
import {postsRoute} from "./routes/posts-route";
import {DB} from "./db/db";

export const app = express()


app.use(express.json())

app.use('/videos', videosRoute)
app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    DB.videos.length = 0
    DB.blogs.length=0
    DB.posts.length=0
    res.sendStatus(204)
})