import { Avatar } from "./BlogCart"

export const AppBar = ( ) =>{
    return <div className="border-b flex justify-between px-10 py-4 w-full">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar name="Punit" size={6}/>
        </div>
    </div>
}