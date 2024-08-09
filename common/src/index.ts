// we can define in backend like prev. project but we need this zod in frontend folder also so we need a common moudle 
// this thing can be done my mono repo

import { z } from 'zod'
export const signupInput = z.object({
  email : z.string().email(),
  password: z.string().min(6),

  })
  export const signinInput = z.object({
    email : z.string().email(),
    password: z.string().min(6),
  })
  export type SignupInput = z.infer<typeof signupInput>
  export type SigninInput = z.infer<typeof signinInput>
  
  export const  blogInput = z.object({
      title : z.string(),
      content : z.string(),
      id : z.string()
    })
    export const  updateblogInput = z.object({
        title : z.string(),
        content : z.string()
    })
    export type BlogInput = z.infer<typeof blogInput>
    export type UpdateBlogInput = z.infer<typeof blogInput>
    
  