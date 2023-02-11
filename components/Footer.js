import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from 'react-icons/ai';


const Footer = () => {
    return ( 
    <div className=" h-7 bg-stone-500 flex justify-center items-center fixed bottom-0 w-full">
        <p className=" text-center font-serif italic text-white text-xs">Love in focus-2023  </p>
        <AiOutlineFacebook color="white" size={25} className="rounded-2xl pl-1"/>
        <AiOutlineInstagram color="white" size={25} className="rounded-2xl pl-1"/>
    </div> 
    );
}
 
export default Footer;