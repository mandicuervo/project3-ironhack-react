import { useState } from "react"

export default function TopBeats() {
    const [topBeats, setTopBeats] = useState([null])
    return(
        <div>
            <h1>Hot Beats</h1>
            <p>Discover the most played beats</p>
        </div>
    )
}