import './Sidebar.css'

export default function Sidebar({ closeSideBar }) {

    return(
        <div className="Sidebar">
            <div className='sidebar-container'></div>
            <div className='transparent-layer' onClick={closeSideBar}></div>
        </div>
    )
}