import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@gaurav8861r/medium-common";
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({

		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body)
	if (!success) {
		c.status(411);
		return c.json({
			msg: "wrong input"
		})
	}
	try {

		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name
				
			}
		})
		const name = user.name;
		const token = await sign({ id: user.id }, c.env.JWT_SECRET)
		//extract id
		const id = user.id;
		return c.json(
			{token,name,id}
		)
	} catch (error) {
		c.status(403);
		return c.text("invalid")
	}


})


userRouter.post('/signin', async (c) => {

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body)
	if (!success) {
		c.status(411);
		return c.json({
			msg: "wrong input"
		})
	}
	const prisma = new PrismaClient({

		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try {

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password
			}
		});

		if (!user) {
			c.status(403);
			return c.json({ error: "user not found" });
		}
const name = user.name;
const id = user.id;
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			token,name,id
		})
	} catch (error) {
		console.log(error)
		c.status(411);
		return c.json({
			msg: "invalid"
		})
	}
})


userRouter.put('/:id',async(c)=>{
	const  id  = c.req.param("id")
	const body = await c.req.json();
	const prisma = new PrismaClient({
		
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		

		 await prisma.user.update({
			where: {
				id:id,
			},data:{
				email:body.email,
				password:body.password,
				name:body.name
			}
		});
		return c.json(
			{msg:"updated"}
		 )
		
	} catch (error) {
		console.log(error)
		c.status(411);
		return c.json({
			msg: "invalid"
		})
	}
})

userRouter.get("/users",async(c)=>{
	const prisma = new PrismaClient({
		
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
		try {
			const users = await prisma.user.findMany({
			select:{
				id:true	,
				name:true,
				email:true,
			}
		})
		return c.json({
			users
		})
		} catch (error) {
			console.log(error)
		}
		
		
	
})