// import { getByTitle } from "@testing-library/react";
import React, { Component } from "react";

export class NewsItem extends Component {
   
  render() {
    let { title, description ,imageurl,newsurl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          <img src={imageurl?imageurl:"https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unkonwn"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-primary btn-btn-sm">Read more</a>
          </div>
       
        </div>
      </div>
    );
  }
}

export default NewsItem;
