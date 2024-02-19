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
    const [included, setIncluded] = useState(false)
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json")
            .then(response => response.json())
            .then(r => {
                r.entries.map(it => {
                    if (it.title == id) { setDetail(it); setLoading(false) }
                    cart.map(item => {
                        if (item.title == it.title) { setIncluded(true) }

                    })
                })
            })

    }, [])

    const AddToCart = () => {
        setCart([...cart, detail])
        setIncluded(true)
    }
    function handleDelete(chartItem) {
        let newCart = []
        cart.map(item => {
            if (item != chartItem) { newCart = [...newCart, item] }
        })
        setCart(newCart)
        setIncluded(false)
    }


    return (<>
        <div className=" px-28 py-10 pt-32">
            <p>{detail.title}</p>
            {!included && <p>included is false</p>}
            {included && <p>included is true</p>}

            <div className="flex gap-10">
                {!loading && <img className="h-96" src={detail.images['Poster Art'].url} />}
                {/* here the "!loading" is key, without it, at first when fetching the data, poster art is loading, thus, it's unefined until it gets loaded */}
                {/* that's why we have to have an initial state of something before it completely loads */}
                <p className="w-1/2">{detail.description}</p>
                <div>
                    {!included && <button onClick={() => AddToCart()} className="rounded p-1 m-1 text-white bg-sky-500">Add to Favourites</button>}
                    {included && <button className="bg-red-600 text-white rounded p-1 m-2 text-center" onClick={() => handleDelete(detail)}>Delete favourite</button>
                    }
                </div>

            </div>
        </div>
    </>)
}