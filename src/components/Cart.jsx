import { useContext, useEffect } from "react"
import { CartContext } from "../context/CartContext"

export default function Cart() {
    const [cart, setCart] = useContext(CartContext)
    function handleDelete(chartItem) {
        let newCart = []
        cart.map(item => {
            if (item != chartItem) { newCart = [...newCart, item] }
        })
        setCart(newCart)
    }

    return (
        <>
            <div className="px-28 py-10 h-10 bg-gray-600 text-3xl flex items-center text-white pt-32">
                <h2>
                    Your Favourites
                </h2>
            </div>

            <div className="px-28 py-10 flex gap-10 justify-center flex-wrap">
                {cart && cart.map(chartItem => {
                    return (<div key={chartItem.title} className="flex flex-col items-center">
                        {chartItem.title}
                        <img width={"150px"} src={chartItem.images['Poster Art'].url} />
                        <button className="bg-red-600 text-white rounded p-1 m-2 text-center" onClick={() => handleDelete(chartItem)}>Delete from favourites</button>
                    </div>)
                })}
                {!cart.length && <p>At the moment there are no Favourites added to your list</p>}

            </div>
        </>)
}