import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";
// In order to make a Detail Page, its mandatory to fetch again and find the specific item we need.
// To filter in the data, we provide the url with the filtered data we need, and the get it via "useParams"
export default function Detail() {
    const { id } = useParams();
    const [detail, setDetail] = useState({})
    const [loading, setLoading] = useState("true")
    const [cart, setCart] = useContext(CartContext)
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json")
            .then(response => response.json())
            .then(r => {
                r.entries.map(it => {
                    if (it.title == id) { setDetail(it); setLoading(false) }
                })
            })

    }, [])

    function AddToCart() {
        let includes = false
        cart.map(itemCart => {
            if (itemCart.title == detail.title) { includes = true }
        })
        if (!includes) { setCart([...cart, detail]) }
        includes = false
    }
    function handleDelete() {
        let newCart = []
        cart.map(item => {
            if (!(item.title == detail.title)) { newCart = [...newCart, item] }
        })
        setCart(newCart)
    }

    function included(item) {
        let includes = false
        cart.map(itemCart => {
            if (itemCart.title == item.title) { includes = true }
        })
        return includes
    }
    return (<>
        <div className=" px-28 py-10 pt-32">
            <p>{detail.title}</p>
            <div className="flex gap-10 flex-wrap md:flex-nowrap">
                {!loading && <img className="h-96" src={detail.images['Poster Art'].url} />}
                {/* here the "!loading" is key, without it, at first when fetching the data, poster art is loading, thus, it's unefined until it gets loaded */}
                {/* that's why we have to have an initial state of something before it completely loads */}
                <p className="">{detail.description}</p>
                <div>
                    {!included(detail) && <button onClick={() => AddToCart()} className="rounded p-1 m-1 text-white bg-sky-500">Add to Favourites</button>}
                    {included(detail) && <button className="bg-red-600 text-white rounded p-1 m-2 text-center" onClick={() => handleDelete(detail)}>Delete favourite</button>
                    }
                </div>

            </div>
        </div>
    </>)
}