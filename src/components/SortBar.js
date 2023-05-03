import React from 'react'

function SortBar({ handleSortAction }){

    const parentDivStyle = {
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        width: "100vw",
        height: "10rem",
        marginBottom: "2rem"
    }


    const sortOptionStyle = {
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingBottom: "0",
        marginBottom: '0',
        fontSize: "2rem",
        fontWeight: "900",
        cursor: "pointer"
    }


    return (
        <div style={parentDivStyle}>
            <div style={{marginLeft: "2rem"}}>
                <h1 style={{fontSize: "1.5rem"}}>Sort Bots By: </h1>
                <>
                    <div style={{display: "flex", alignItems: "center"}} >
                        <div onClick={()=>{handleSortAction("health")}} className="ui card">
                            <h2 style={sortOptionStyle}>Health<i className="fa-solid fa-sort"></i></h2>
                        </div>

                        <div onClick={()=>{handleSortAction("damage")}} className="ui card">
                            <h2 style={sortOptionStyle}>Damage<i className="fa-solid fa-sort"></i></h2>
                        </div>

                        <div onClick={()=>{handleSortAction("armor")}} className="ui card">
                            <h2 style={sortOptionStyle}>Armor<i className="fa-solid fa-sort"></i></h2>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default SortBar;