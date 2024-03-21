import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@gaurav8861r/medium-common";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    console.log("hii")
    const authheader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authheader, c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403);
            return c.json({
                msg: "not logged in"
            })
        }
    } catch (error) {
        console.log(error)
        c.status(403);
        return c.json({
            msg: "not logged in"
        })
    }

})

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({
            msg: "wrong input"
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                //want my date in this type of format march 12,2021 not timestamp
               date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }
        })
        return c.json({
            id: blog.id,
            date: blog.date
        })
    } catch (error) {
        c.status(403);
        return c.text("invalid")
    }

})
//want to delete all blogs of specific user id
blogRouter.delete('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    try {
        const blogs = await prisma.blog.deleteMany({
            where: {
                authorId: authorId
            }
        })
        return c.json({
            blogs
        })
    } catch (error) {
        c.status(403);
        return c.text("invalid")
    }

}
)





blogRouter.put('/:id', async (c) => {
    const id = c.req.param("id")
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({
            msg: "wrong input"
        })
    }
    const prisma = new PrismaClient({

        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {

        const blog = await prisma.blog.update({
            where: {
                id: id
            },
            data: {
                title: body.title,
                content: body.content,

            }
        })


        return c.json({
            id: blog.id
        })
    } catch (error) {
        c.status(403);
        return c.text("invalid")
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({

        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true,
                }
            },
            date:true
        }
    });
    for (let blog of blogs) {
        if (!blog.author.name) {
            blog.author.name = "Anonymous";
        }
    }


    return c.json({ blogs })
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")

    const prisma = new PrismaClient({

        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            }, select: {
                content: true,
                id: true,
                title: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }

        })

        if (blog && blog.author && !blog.author.name) {
            blog.author.name = "Anonymous";
        }
        return c.json(
            { blog }
        )
    } catch (error) {
        c.status(411);
        console.log(error)
        return c.text("error while fetching blog")
    }
})
