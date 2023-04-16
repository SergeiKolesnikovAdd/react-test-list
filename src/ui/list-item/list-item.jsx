import "./list-item.scss"
import { useState } from "react"

export const ListItem = ({name, email, ...props}) => {
    return (
      <>
        <div className="list-item-container">
          <span className="list-item-info list-item-info_name">{name}</span>
          <span className="list-item-info list-item-info_email">{email}</span>
        </div>
      </>
    );
}

export default ListItem;