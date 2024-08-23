import React, { Component } from 'react'

// export class NewsItem extends Component {
const NewsItem = (props) => {
  // render() {
    // let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='ny-3'>
        <div className="card">
            
            <img src={imageUrl ? imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}
                  <div className='position-absolute top-0 d-flex justify-content-end end-0'>
                    <span className="z-1 badge rounded-pill bg-danger">
                      { source }
                    </span>
                  </div>
                </h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more..</a>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleString()}</small></p>
            </div>
        </div>
      </div>
    )
  // }
}

export default NewsItem