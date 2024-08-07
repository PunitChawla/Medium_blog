import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET : string
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const JWT_SECRET = c.env.JWT_SECRET
  const token  = await sign({id :user.id} , JWT_SECRET);
  return c.json({
    jwt : token
  })

});



app.post("/api/v1/user/signin", async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  // now find with this email

  const user = await prisma.user.findUnique({
    where:{
      email : body.email
    }
  })

  if(!user)
  {
    c.status(403);
    return c.json({error : "User not found"});
  }

  const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
  return c.json({jwt})

});
app.post("/api/v1/blog", (c) => {
  return c.text("hello");
});
app.put("/api/v1/blog", (c) => {
  return c.text("hello");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("hello");
});

export default app;
