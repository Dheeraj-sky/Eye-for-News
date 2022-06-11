import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general',
    }
    static propTypes ={
        country:  PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
     capitalizeFirstLetter=(string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  constructor(props) {
    super(props);
    // console.log("helo my app is constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
    document.title=this.capitalizeFirstLetter(`${this.props.category}-Eye for News`);
  }
  async  update() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1039bd79ca9f48cebd60f16f11c51b28&page=${this.state.page}&pageSize=${this.props.pageSize}`;   
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
   } ) 
  }
//   movenext = async () => {
//     this.setState({page:this.state.page+1})
//     this.update();
// };
//   moveprev = async () => {
//     this.setState({page:this.state.page-1})
//     this.update()
//   };
  async componentDidMount() {
    this.update();
  }
  fetchMoreData = async() => {
   
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1039bd79ca9f48cebd60f16f11c51b28&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;   
            this.setState({page:this.state.page+1})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
             articles: this.state.articles.concat(parsedData.articles),
             totalResults:parsedData.totalResults,
            } ) 
  };
  render() {
    return (
      <>
        <h1 className="text-center " style={{margin:"30px 0px" ,marginTop:'90px'}}>Eye for News-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
     {/* {this.state.loading && <Spinner/>} */}

     <InfiniteScroll  
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
                    <div className="container">
                      <div className="row">
                      {this.state.articles.map((element) => {
                         return <div className="col-md-4" key={element.url}>
                            <NewsItem
                              title={element.title? element.title : ""}
                              description={element.description ? element.description : " "}
                              author={element.author}
                              date={element.publishedAt}
                              newsurl={element.url}
                              source={element.source.name}
                              imageurl={element.urlToImage } />
                          </div>
                      })}
                      {/* Next and prev button part */}
        </div>
        </div>
        </InfiniteScroll>
        </>
    );
  }
}

export default News;
