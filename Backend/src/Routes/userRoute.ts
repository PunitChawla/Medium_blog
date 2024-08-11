import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign } from "hono/jwt";
import{ signupInput , signinInput} from "@punitchawla/mediumblogschema"
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    };
  }>();
  
userRouter.post('/signup' , async (c)=>{

  const body = await c.req.json();

  const result = signupInput.safeParse(body);
  if(!result.success)
  {
    c.status(411)
    return c.json({
      msg : "Invalid input",
      error : result.error.issues
    })
  }
  const prisma =  new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.create({
      data:{
        username: body.username,
        password: body.password,
        name : body.name
      }
    })

    const JWT_SECRET = c.env.JWT_SECRET
    const token = await sign({id : user.id}, JWT_SECRET)
    return c.json({jwt : token})

  } catch (error) {
    return c.json({error : error})
  }
})

userRouter.post('/signin', async (c) =>{
  const body = await c.req.json();
  const result = signinInput.safeParse(body);
  if(!result.success)
  {
    c.status(411)
    return c.json({
      msg : "Invalid input",
      error : result.error.issues
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findFirst({
      where:{
        username : body.username,
        password : body.password
      }
    })

    if(!user)
    {
      c.status(403)
      c.json({
        msg : "User not found "
      })
    }
    
      if(user!= null)
      {
        const jwt = await sign({
        id :user.id
      }, c.env.JWT_SECRET);
      return c.text(jwt)
    }
    else{
      return c.json({msg : "Incorrect creds"})
    }
  } catch (error) {
    c.json({
      msg : "error while signin",
      error : error
    })
  }
})