import { Hono } from "hono";

export const blogRoute = new Hono();

import { verify, sign } from "hono/jwt";
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    };
  }>();
  

// add some middleware in hono -> you can write function like prev one but here can you also use that 

blogRouter.use("/*", async (c,next) => {

  const jwt = c.req.header("Authorization")
  if(!jwt)
  {
    c.status(401);
    return c.json({ error : "unauthorized" });
  }

  const token = jwt.split(' ')[1];
  const payload = await verify(token,c.env.JWT_SECRET)

  if(!payload)
  {
    c.status(401)
    return c.json({ error : "unauthorized"})
  }
  if(payload.id)
  {
    next();
  }else{
    return c.json({error : "unauthorized"})
  }
})


blogRouter.post("/", (c) => {
    return c.text("hello");
  });
  
  
  blogRouter.put("/", (c) => {
    return c.text("hello");
  });
  
  blogRouter.get("/:id", (c) => {
    return c.text("hello");
  });
  