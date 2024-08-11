import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput , updateBlogInput} from '@punitchawla/mediumblogschema';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { prettyJSON } from "hono/pretty-json";
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      // define userid for middleware
      userId: any
    };
  }>();

blogRouter.use('/*' , async (c, next)=>{
    const authheader = c.req.header("authorization") || ""

    try {
        const user = await verify(authheader, c.env.JWT_SECRET)
        if(user)
        {
            c.set("userId", user.id);
            await next();
        }
        else{
            c.status(403)
            return c.json({message : "You are not login"})
        }
    } catch (error) {
        c.status(403)
        return c.json({
        msg : "You are not login" ,
        error : error
        })
    }
 })

 blogRouter.post('/' , async (c)=> {
    const body =  await c.req.json()
    const result = createBlogInput.safeParse(body)
    if(!result.success)
    {
        c.status(403)
        return c.json({
            msg : "invalid input",
            error : result.error.issues
        })
    }
    try {
        const authorid = c.get("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                content : body.content,
                authorId: Number(authorid)
            }
        })

        return c.json({
            msg : "blog created",
            id : blog.id
        })
    } catch (error) {       
        return c.json({msg : "Error while create blog",
            error : error
        })
    }
 })


 blogRouter.put('/', async (c)=>{
    const body = await c.req.json();

    const result = updateBlogInput.safeParse(body)
    if(!result.success)
    {
        c.status(403)
        return c.json({
            msg : "invalid input",
            error : result.error.issues
        })
    }
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const blog = await prisma.blog.update({
            where:{
                id: body.id
            },
            data:{
                title : body.title,
                content : body.content
            }
            
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {       
        return c.json({msg : "Error while updating  blog",
            error : error
        })
    }
 })
 blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

 blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.blog.findFirst({
            where:{
                id : Number(id)
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
    
        return c.json({
            blogs
        })   
    } catch (error) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})

