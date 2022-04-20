import { Pending } from "./pending/Pending"

export const TaskCategories = () => {

    return (
        <>  
            <Pending />
            <div className="column category-column column-1">
                <h2>Category 1 tasks</h2>
                <p>Tasks can be dragged and dropped into any one of these columns, to sort and organise them</p>
                <p>Tasks can also be moved up and down each column to present a heirachi of importance</p>
            </div>
            <div className="column category-column column-2">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column category-column column-3">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column completed-column">
                <h2>Completed tasks</h2>
            </div>
        </>
    )
}