import { BlogSkeleton } from "../Components/BlogSkeleton";
import { FullBlog } from "../Components/Fullblog";
import { useBlog } from "../Hooks"
import { useParams } from "react-router-dom";
export const Blog = () =>{
    const { id } = useParams();

    const {loading , blog} = useBlog({
        id : id || ""
    });

    if(loading)
    {
        return <div>
            <BlogSkeleton/>
        </div>
    }   
    return <div>
        <FullBlog blog={blog}/>
    </div>
}