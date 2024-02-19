import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Movies() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState("true")
    const [cart, setCart] = useContext(CartContext)
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json")
            .then(response => response.json())
            .then(r => {
                setData(r.entries.filter((i) => i.releaseYear >= 2010).sort((a, b) => a.title.localeCompare(b.title)))
                setLoading("false")
            })


    }, [])

    function AddToCart({ item }) {
        let includes = false
        cart.map(itemCart => {
            if (itemCart.title == item.title) { includes = true }
        })
        if (!includes) { setCart([...cart, item]) }
        includes = false
    }
    function handleDelete(chartItem) {
        let newCart = []
        cart.map(item => {
            if (!(item.title == chartItem.title)) { newCart = [...newCart, item] }
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
        <div className="px-28 py-10 h-10 bg-gray-600 text-3xl flex items-center text-white pt-32">
            <h2>
                Movies
            </h2>
        </div>
        <section>
            <ul>
                {!loading ? <p>Loading ...</p> : <div className="flex flex-wrap px-28 py-10 justify-center gap-2"> {
                    data.map(item => {
                        if (item.programType == "movie")
                            return (
                                <div key={item.title} className="flex flex-col items-center">
                                    <Card item={item} ></Card>
                                    <div className="flex">
                                        <div>
                                            {!included(item) && <button onClick={() => AddToCart({ item })} className="rounded p-1 m-1 text-white bg-sky-500">Add to Favourites</button>}
                                            {included(item) && <button className="bg-red-600 text-white rounded p-1 m-2 text-center" onClick={() => handleDelete(item)}>Delete favourite</button>
                                            }
                                        </div>
                                        <Link className="flex justify-center" to={`/Detail/${item.title}`}>
                                            <button className="rounded p-1 m-1 text-white bg-sky-500">See details</button>
                                        </Link>
                                    </div>
                                </div>

                            )
                    })}</div>}</ul>

        </section ></>)
}
