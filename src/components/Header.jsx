import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
    const [cart, setCart] = useContext(CartContext)
    return (<>
        <div className="h-10 bg-sky-500 fixed w-full text-white text-3xl py-10 px-28 flex items-center justify-between">
            <Link to="/">DEMO STREAMING</Link>
            {/* it's key to use only LINK and not the <a></a> for rounting */}
            {/* using the <a> tag will RE-RENDER all the app, and send you as a refresh would do it */}
            <Link to="/Cart" >
                <div className="flex items-center justify-center gap-2 text-lg bg-white rounded p-2">
                    <p>⭐</p>
                    <p className="text-black">{cart.length}</p>

                </div></Link>
        </div>
    </>)
}
