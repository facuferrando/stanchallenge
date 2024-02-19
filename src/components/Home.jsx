import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    function handleChange(e) {
        setSearch(e.target.value)
    }
    function searchTitle() {
        {
            fetch("https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json")
                .then(response => response.json())
                .then(r => {
                    setData(r.entries.filter((i) => i.releaseYear >= 2010).sort((a, b) => a.title.localeCompare(b.title)))
                })
        }
    }
    useEffect(() => {
        searchTitle()

    }, [])
    return (
        <>
            <div className="px-28 py-10 h-10 bg-gray-600 text-3xl flex items-center text-white pt-32">
                <h2>
                    Popular Titles
                </h2>
            </div>
            <main className="px-28 py-10 flex gap-10 h-full flex-wrap">
                <div>
                    <Link to="/Movies" >
                        <img src="/Screenshot_1.png"></img>
                        <p className="text-center">Popular Movies</p></Link>
                </div>
                <div> <Link to="/Series">
                    <img src="/Screenshot_1.png"></img>
                    <p className="text-center">Popular Series</p></Link>
                </div>
                <div className="flex flex-col">
                    <p>Search Movie/Series</p>
                    <input onChange={handleChange} className="border-solid border-sky-500 border-4 h-10 rounded-xl" />
                    <ul>
                        {search && data.map(item => {
                            if (item.title.toLowerCase().includes(search.toLowerCase()))
                                return (
                                    <li key={item.title}>
                                        <Link to={`/Detail/${item.title}`}>
                                            {item.title}
                                            <img width={"100px"} src={item.images["Poster Art"].url}></img>
                                        </Link>
                                    </li>)
                        })}
                    </ul>
                </div>
            </main>
        </>
    )
}