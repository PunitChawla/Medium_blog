

interface BlogcartInput {
    authorName : string,
    title : string,
    content : string,
    publishedDate : string
}
export const BlogCart = ({
    authorName,
    title,
    content,
    publishedDate
}:BlogcartInput)=>{

    return <div>
            <div className="border-b border-slate-200 pb-4 pt-4">
                <div className="flex ">
                    <div className="flex justify-center flex-col  ">
                        <Avatar name={authorName} />
                    </div>
                    <div className="flex justify-center flex-col font-extralight pl-2">
                        {authorName}
                    </div>
                    <div className="pl-2 font-thin text-slate-500">
                    {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-1">
                    {title}
                </div>
                <div className="text-md font-thin pt-1">
                    {content.slice(0,100) + "..."} 
                </div>

                <div className="text-slate-500 text-sm font-thin pt-3">
                    {`${Math.ceil(content.length /100)} minutes read`}
                </div>
            </div>
</div>
}

export function Avatar({name ,size = 6}:{name : string , size?: number}){
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}