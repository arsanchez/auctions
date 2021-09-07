import React from 'react';
const ItemContent = (props) => {
  return (
    <div className="col-sm-6" style={{marginBottom: '20px'}}> 
        <div className="card" style={{width: '30rem'}}>
            <img className="card-img-top" src={props.item.photo_url} alt="Detail image" width="100" height="150"></img>
            <div className="card-body">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text">{props.item.description}</p>
                <a href="#" className="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
  )
};
export default ItemContent