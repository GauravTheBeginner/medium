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
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body)
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

		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name
			}
		})

		const token = await sign({ id: user.id }, c.env.JWT_SECRET)

		return c.text(
			token
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

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(
			jwt
		)
	} catch (error) {
		console.log(error)
		c.status(411);
		return c.json({
			msg: "invalid"
		})
	}
})