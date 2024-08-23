import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

// for function based component
import { useEffect, useState } from 'react';

// export class News extends Component {

//     static defaultProps = {
//         country: 'in',
//         pageSize: 15,
//         category: 'general'
//     }

//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string
//     }

//     pageSize = 20;

//     capitalizaFirstLetter = (stringVal) => {
//         console.log('stringval----', stringVal);
//         return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             totalResults: 0,
//             page: 1
//         }
//         document.title = `${this.capitalizaFirstLetter(this.props.category)} NewsMonkey`;
//     }

//     async componentDidMount() {
//         // will be called after render method is called and completed
//         console.log('inside componnent did mount');
//         this.props.setProgress(0);
//         await this.getArticlesData();
//         this.props.setProgress(100);
//     }

//     async getArticlesData() {
//         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         // this.setState({loading: true});
//         // console.log('data------', data);
//         let parsedData = await data.json();
//         console.log('parsed data----', parsedData, this.state.articles);
//         if (parsedData.articles?.length) {
//             this.state.articles.push(...parsedData.articles);
//         }
//         this.setState({totalResults: parsedData.totalResults, loading: false});
//     }

//     handleNavigationClick = (navigationType) => {
//         const nextPage = this.state.page + 1;
//         // await new Promise(resolve => this.setState({page: navigationType === 'next' ? this.state.page + 1 : this.state.page - 1}, resolve));
//         this.setState({page: navigationType === 'next' ? this.state.page + 1 : this.state.page - 1, loading: true}, () => {
//             if (navigationType === 'next' ? nextPage <= Math.ceil(this.state.totalResults/this.props.pageSize) : true) {
//                 this.getArticlesData();
//             }
//         });
//     }

//     fetchMoreData = () => {
//         this.setState({
//         page: this.state.page + 1,
//         }, () => {
//         this.getArticlesData();
//         });
//     };

//   render() {
//     return (
//       <>
//         <h2 className='text-center'>NewsMonkey - Top {this.capitalizaFirstLetter(this.props.category)} Headlines </h2>
//         {/* checks if state.loading is true then displays spinner */}
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//             dataLength={this.state.articles.length}
//             next={this.fetchMoreData}
//             hasMore={this.state.articles.length !== this.state.totalResults}
//             loader={<Spinner />}
//             >
//             <div className="container">
//                 <div className="row">
//                     {this.state.articles.map((element) => {
//                         return <div className="col-md-4 my-3" key={element.url}>
//                             <NewsItem title={element.title && element.title?.length > 45 ? element.title.slice(0, 45) + '...' : ''} description={element.description && element.description?.length > 88 ? element.description.slice(0, 88) + '...' : ''} 
//                             imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source?.name} />
//                         </div>
//                     }) }
//                 </div>
//             </div>
//         </InfiniteScroll>
//         <div className="container d-flex justify-content-between">
//         <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={() => this.handleNavigationClick('prev')}>&larr; Previous</button>
//         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) } type="button" className="btn btn-dark" onClick={() => this.handleNavigationClick('next')}>Next &rarr;</button>
//         </div>
//       </>
//     )
//   }
// }

/////// FOR FUNCTION BASED COMPONENT ////////////////

// export class News extends Component {
const News = (props) => {

        // for function based
        const [articles, setArticles] = useState([]);
        const [loading, setLoading] = useState(true);
        const [totalResults, setTotalResults] = useState(0);
        const [page, setPage] = useState(1);
    
        const pageSize = 20;
    
        const capitalizaFirstLetter = (stringVal) => {
            console.log('stringval----', stringVal);
            return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
        }
    
        // replacement of componentdidmount
        useEffect(() => {
            props.setProgress(0);
            document.title = `${capitalizaFirstLetter(props.category)} NewsMonkey`;
            async function fetchData() {
                await getArticlesData();
            }
            fetchData();
            props.setProgress(100);
        }, []);

        useEffect(() => {
            if (page !== 1) {
                getArticlesData()
            }
        }, [page]);
    
        const getArticlesData = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            // this.setState({loading: true});
            // console.log('data------', data);
            let parsedData = await data.json();
            console.log('parsed data----', parsedData, articles);
            if (parsedData.articles?.length) {
                setArticles(articles.concat(...parsedData.articles));
            }
            setTotalResults(parsedData.totalResults);
            setLoading(false);
        }
    
        const handleNavigationClick = (navigationType) => {
            const nextPage = page + 1;
            // await new Promise(resolve => this.setState({page: navigationType === 'next' ? this.state.page + 1 : this.state.page - 1}, resolve));
            setLoading(true);
            setPage(page => navigationType === 'next' ? page + 1 : page - 1);

            if (navigationType === 'next' ? nextPage <= Math.ceil(totalResults/props.pageSize) : true) {
                getArticlesData();
            }
        }
    
        const fetchMoreData = () => {
            console.log('page before-------', page);
            // const updatedPage = page + 1;
            setPage(page + 1);
            console.log('page after-------', page);
            
            // getArticlesData();
        };
    
    //   render() {
        return (
          <>
            <h2 className='text-center' style={{'margin-top': '70px'}}>NewsMonkey - Top {capitalizaFirstLetter(props.category)} Headlines </h2>
            {/* checks if state.loading is true then displays spinner */}
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title && element.title?.length > 45 ? element.title.slice(0, 45) + '...' : ''} description={element.description && element.description?.length > 88 ? element.description.slice(0, 88) + '...' : ''} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source?.name} />
                            </div>
                        }) }
                    </div>
                </div>
            </InfiniteScroll>
            <div className="container d-flex justify-content-between">
            {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={() => this.handleNavigationClick('prev')}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) } type="button" className="btn btn-dark" onClick={() => this.handleNavigationClick('next')}>Next &rarr;</button> */}
    
            {/* for function based */}
            <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={() => handleNavigationClick('prev')}>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize) } type="button" className="btn btn-dark" onClick={() => handleNavigationClick('next')}>Next &rarr;</button>
            </div>
          </>
        )
    //   }
    }
    
News.defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News