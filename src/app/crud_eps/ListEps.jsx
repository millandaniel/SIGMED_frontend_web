import EpsCard from "./EpsCard"

async function cargarEpss() {
    const res = await fetch(`${process.env.BACKEND_URL}/eps/`)
    const epss = await res.json()
    return epss
}

async function ListEps() {

    const epss = await cargarEpss()

    return (
        <center>
            <div className=" bg-gray-200 p-4 rounded-md inline-block">
                <EpsCard epss={epss} />
            </div>
        </center>
    )
}

export default ListEps