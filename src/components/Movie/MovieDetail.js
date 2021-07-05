import React, { Component } from 'react'
import "./Movie.css"
import axios from "axios"

// create movie detail component
export class MovieDetail extends Component {
    state={
        genre:"",
        released:"",
        runtime:"",
        director:"",
        actors:"",
        plot:"",
        loading:false
    }
// once we click on list item (Link), we send get request to individual movie api using this.props.match.params.movieTitle
    async componentDidMount() {
        console.log(this.props)
        try {
            let foundMovie = await axios.get(
            `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&t=${this.props.match.params.movieTitle}`
            );
            // grab all the info and save to state
            this.setState({
                title:foundMovie.data.Title,
                poster:foundMovie.data.Poster,
                genre:foundMovie.data.Genre,
                released:foundMovie.data.Released,
                runtime:foundMovie.data.Runtime,
                director:foundMovie.data.Director,
                actors:foundMovie.data.Actors,
                plot:foundMovie.data.Plot,
                notFoundError:"",
                titleClicked:true
                        })
                        console.log(foundMovie)
        } catch (e) {
            console.log(e);
        }
    }
// show movie detail function to show info we grabbed from api
    showMovieDetail = ()=>{
        return <div className="main-div">
                <h3 className="titleOne">{this.state.title}</h3>
            <div className="infoAndPoster">
                <img className="img" src={this.state.poster} />
            <div className="info">
                <div className="info-details">Released: {this.state.released}</div>
                <div className="info-details">Genre: {this.state.genre}</div>
                <div className="info-details">Runtime: {this.state.runtime}</div>
                <div className="info-details">Director: {this.state.director}</div>
                <div className="info-details">Actors: {this.state.actors}</div>
                <div className="info-details">Plot: {this.state.plot}</div>
            </div>
            </div>
        </div>
        
    }

    render() {
        return <div>
            {/* check if it's still loading and if yes show loading */}
            {this.state.loading?
            (
                <div>...Loading</div>
            ):(
                // else show movie details
                this.showMovieDetail()
            )}
            </div>;
        }
}
export default MovieDetail;