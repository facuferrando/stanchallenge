import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { CartContext } from "../context/CartContext";

export default function Series() {
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
    const AddToCart = ({ item }) => {
        if (!cart.includes(item)) { setCart([...cart, item]) }
    }
    function handleDelete(chartItem) {
        let newCart = []
        cart.map(item => {
            if (item != chartItem) { newCart = [...newCart, item] }
        })
        setCart(newCart)
    }
    return (<>
        <div className="px-28 py-10 h-10 bg-gray-600 text-3xl flex items-center text-white pt-32">
            <h2>
                Series
            </h2>
        </div>
        <section>
            <ul>
                {!loading ? <p>Loading ...</p> : <div className="flex flex-wrap px-28 py-10 justify-center gap-2"> {data.map(item => {
                    if (item.programType == "series")
                        return (
                            <div key={item.title} className="flex flex-col items-center">
                                <Card item={item}></Card>
                                <div className="flex">
                                    <div>
                                        {!cart.includes(item) && <button onClick={() => AddToCart({ item })} className="rounded p-1 m-1 text-white bg-sky-500">Add to Favourites</button>}
                                        {cart.includes(item) && <button className="bg-red-600 text-white rounded p-1 m-2 text-center" onClick={() => handleDelete(item)}>Delete from favourites</button>
                                        }
                                    </div>
                                    <Link className="flex justify-center" to={`/Detail/${item.title}`}>

                                        <button className="rounded p-1 m-1 text-white bg-sky-500">See details</button>
                                    </Link>
                                </div>
                            </div>)
                })}</div>}
            </ul>

        </section ></>)
}
