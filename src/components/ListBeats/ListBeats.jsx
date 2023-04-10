import './ListBeats.css'

export default function ListBeats({list}) {
    return(
        <div className='ListBeats'>
            {
                list && list.length > 0 && list.map((beat) => ( 
                    <div className='list' key={beat._id}>
                        <h5>{beat.name}</h5>
                    </div>
                ))
            }
        </div>
    )
}