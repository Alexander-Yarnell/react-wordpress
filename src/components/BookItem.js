import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export class BookItem extends Component {
  state = {
    imgUrl: "",
    author: "",
    isloaded: false,
  };
  static propTypes = {
    book: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { featured_media, author } = this.props.book;
    const getImageUrl = axios.get( 
      `http://45.79.38.174:8000/wp-json/wp/v2/media/${featured_media}`
    );
    const getAuthor = axios.get( 
      `http://45.79.38.174:8000/wp-json/wp/v2/users/${author}`
    );

    Promise.all([getImageUrl, getAuthor]).then((res) => {
      this.setState({
        imgUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true,
      });
    });
  }

  render() {
    const { title, excerpt } = this.props.book;
    const { author, imgUrl, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          <h2 style={{marginBottom: 0}}>{title.rendered}</h2>
          <small>Review by <strong>{author}</strong></small>
          <img style={{width: "500px"}}src={imgUrl} alt={title.rendered}/>
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
        </div>
      );
    }
    return( null );
  }
}

export default BookItem;
