import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/constant-status-code";


const  req = supertest(app)

describe('/posts',()=>{

    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    let idNewBlog:string

    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')

        const createRes =await req
            .post('/blogs')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'nameBlog',
                description: 'descriptionBlog',
                websiteUrl:'https://www.outue.Blog/'})
            .expect(STATUS_CODE.CODE_201)
        idNewBlog=createRes.body.id
        console.log(idNewBlog)
    })

    it('get content posts',async ()=>{
        const res = await req
            .get('/posts')
            .expect(STATUS_CODE.CODE_200)

        expect(res.body).toEqual([])

    })





    it('- POST does not create the newPost with incorrect data', async ()=> {
        const res =await req
            .post('/posts')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({title:'titletitletitletitletitletitletitletitle',
                shortDescription:'length_101-DnZlTI1khUHpqOqCzftIYiSHCV8fKjYFQOoCIwmUczzW9V5K8cqY3aPKo3XKwbfrmeWOJyQgGnlX5sP3aW3RlaRSQx',
                content:'222content',
                blogId:'177777'})
            .expect(STATUS_CODE.CODE_400)

        expect(res.body).toEqual({  errorsMessages: [
                { message: 'Incorrect title', field: 'title' },
                { message: 'Incorrect shortDescription', field: 'shortDescription' },
                { message: 'Incorrect blogId', field: 'blogId' },
            ]})


        const getRes = await req.get('/posts/')
        expect(getRes.body).toEqual([])
    })



    let idNewPost:string

    it('POST create newPost',async ()=>{
        const res =await req
            .post('/posts')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'title',
                shortDescription: 'shortDescription',
                content:'content',
                blogId:idNewBlog})
            .expect(STATUS_CODE.CODE_201)

        idNewPost=res.body.id

        expect(res.body.title).toEqual('title')
        expect(res.body.shortDescription).toEqual('shortDescription')
        expect(res.body.content).toEqual('content')
    })

    it('Get post bu incorrect id',async ()=>{
        const res =await req
            .get('/posts/12345')
        .expect(STATUS_CODE.CODE_404)

    })


    it('get content posts',async ()=>{
        const res = await req
            .get('/posts')
            .expect(STATUS_CODE.CODE_200)
    })

    it('Get post bu correct id',async ()=>{
        const res =await req
            .get('/posts/'+idNewPost)
             .expect(STATUS_CODE.CODE_200)

        expect(res.body.title).toEqual('title')
        expect(res.body.shortDescription).toEqual('shortDescription')
        expect(res.body.content).toEqual('content')

    })


    it('- PUT post by incorrect ID ', async () => {

        await req
            .put('/posts/1223')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'updateTitle',
                shortDescription: 'updateShortDescription',
                content:'updateContent',
                blogId:idNewBlog})
            .expect(STATUS_CODE.CODE_404)

        const getRes =await req
            .get('/posts/')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].title).toEqual('title')
        expect(getRes.body[0].shortDescription)
            .toEqual('shortDescription')
        expect(getRes.body[0].content).toEqual('content')
        expect(getRes.body[0].blogId).toEqual(idNewBlog)
    })


    it('+ PUT post by correct ID ', async () => {

        await req
            .put('/posts/'+idNewPost)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'updateTitle',
                shortDescription: 'updateShortDescription',
                content:'updateContent',
                blogId:idNewBlog})
            .expect(STATUS_CODE.CODE_204)

        const getRes =await req
            .get('/posts/')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].title).toEqual('updateTitle')
        expect(getRes.body[0].shortDescription)
            .toEqual('updateShortDescription')
        expect(getRes.body[0].content).toEqual('updateContent')
        expect(getRes.body[0].blogId).toEqual(idNewBlog)
    })


    it('- PUT post by correct ID and incorrect data ', async () => {

        const res=await req
            .put('/posts/'+idNewPost)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({title:'titletitletitletitletitletitletitletitle',
                shortDescription:'length_101-DnZlTI1khUHpqOqCzftIYiSHCV8fKjYFQOoCIwmUczzW9V5K8cqY3aPKo3XKwbfrmeWOJyQgGnlX5sP3aW3RlaRSQx',
                content:'222content',
                blogId:'333blogId'})
            .expect(STATUS_CODE.CODE_400)
        expect(res.body).toEqual({  errorsMessages: [
                { message: 'Incorrect title', field: 'title' },
                { message: 'Incorrect shortDescription', field: 'shortDescription' },
                { message: 'Incorrect blogId', field: 'blogId' },
            ]})

        const getRes =await req
            .get('/posts/')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].title).toEqual('updateTitle')
        expect(getRes.body[0].shortDescription)
            .toEqual('updateShortDescription')
        expect(getRes.body[0].content).toEqual('updateContent')
        expect(getRes.body[0].blogId).toEqual(idNewBlog)
    })



    it('- DELETE post by incorrect ID', async () => {
        await req
            .delete('/posts/888')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.CODE_404)

        const getRes =  await req
            .get('/posts')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].title).toEqual('updateTitle')
        expect(getRes.body[0].shortDescription)
            .toEqual('updateShortDescription')
        expect(getRes.body[0].content).toEqual('updateContent')
        expect(getRes.body[0].blogId).toEqual(idNewBlog)

    })


    it('+ DELETE post by correct ID', async () => {
        await req
            .delete('/posts/'+idNewPost)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.CODE_204)

        const getRes =  await req
            .get('/posts')
        expect(getRes.body.length).toBe(0)
    })



})