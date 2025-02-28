import {  Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";


function Navbar(){
    const [showSideBar , setShowSideBar] = useState(false);
    // const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

    const links = [
        {title : "Home" , link : "/"},
        {title : "All Memes" , link : "/all-memes"},
        {title:"Upload Meme",link:'/upload-meme'},
        // {title : "Cart" , link : "/cart"},
        {title : "Profile" , link : "/profile"}
    ];

    

    return (
        <>
            <div className="relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
                 <Link to="/" className="text-2xl font-bold flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="" className="h-9 mr-2" /> 
                    <span className="">Meme</span><span className="text-zinc-400">Verse</span>.
                 </Link> 
                <nav className="flex gap-4 items-center">
                    <div className="hidden md:flex gap-4 items-center">
                        {links.map(linkItem=> (
                            <NavLink to={linkItem.link} className={"px-4 py-2    hover:text-blue-600   transition-all duration-300"} key={linkItem.title}>
                                {linkItem.title}
                            </NavLink>
                        ))}
                    </div>
                    <button className="text-white text-2xl block md:hidden" onClick={()=>setShowSideBar(true)}>
                        <FiMenu />
                    </button>
                </nav>
            </div>


            {/* Side Bar for small screens */}
            <div className={`${showSideBar==true ? "w-full" : "w-0" } absolute top-0 right-0  h-screen bg-zinc-800 flex flex-col transition-all durartion-1000 overflow-hidden`}>
                {/* Back button */}
                <div className="text-white py-3 pl-4 flex gap-4 items-center" onClick={()=>setShowSideBar(false)} ><RxCross2 />Back</div>

                {/* Nav Links */}
                <div className="flex flex-col">
                    {links.map(linkItem=> (
                        <NavLink to={linkItem.link} onClick={()=>setShowSideBar(false)} className="text-white hover:text-blue-500 transition-all duration-300 border-b border-zinc-600 py-2 text-center" key={linkItem.title}>
                            {linkItem.title}
                        </NavLink>
                    ))}

                    
                </div>      
            </div>
        </>
    )
}

export default Navbar;