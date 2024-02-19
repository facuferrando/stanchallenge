

export default function Card({ item }) {
    return (
        <div >
            <p className="text-center"> {item.title}</p>
            <img width={"250px"} src={item.images["Poster Art"].url} ></img>

        </div>)
}