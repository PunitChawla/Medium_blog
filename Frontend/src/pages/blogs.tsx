import { BlogCart } from "../Components/BlogCart"
import { AppBar } from "../Components/AppBar" 
import { useBlogs } from "../Hooks"
import { BlogSkeleton } from "../Components/BlogSkeleton";


export const Blogs = () =>{
        const{loading, blogs} = useBlogs();
        if(loading)
            {
                return <div>
                    <AppBar/>
                <div className="flex  justify-center">

                    <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    </div>
                 </div>
                </div> 
            }
    return <div>
        <AppBar/>
    <div className="flex justify-center">

            <div >
                {blogs.map(blog=> 
                <BlogCart id={blog.id} authorName={blog.author.name || "Anonymous" }
                 title={blog.title}     
                 content = {blog.content} 
                 publishedDate="23-july-2024"/>
                )}

            </div>
    </div>
    </div>
}