import { Hono } from "hono";
import { userRouter } from "./Routes/userRoute";
import { blogRouter } from "./Routes/blogRoute";


const app = new Hono();
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog' , blogRouter);

export default app;
