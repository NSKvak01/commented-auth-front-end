import React, { Component } from 'react'
// we bring react coponent
// axios
import axios from "axios"
// movie.css style
import "./Movie.css"
// bring List component
import List from "./List"




export class Movie extends Component {
state={
    movieList:[],
    notFoundError:"",
    inputValue:"",
    URL:"",
    titleClicked:false,
    title:"",
    poster:"",
    year:"",
    genre:"",
    released:"",
    runtime:"",
    director:"",
    actors:"",
    plot:""
}

    handleSubmit = async(event)=>{
        // prevent default
        event.preventDefault()
        // if input is empty we ask to type movie title
        if(this.state.inputValue.length === 0){
            this.setState({
                notFoundError:` Please type movie title`,
            })
        } else{
            // else we do get request from api to get the list of movies with the same title
            try {
                let foundMovie = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.inputValue}`)
                this.setState({
                    movieList:foundMovie.data.Search,
                    notFoundError:"",
                    titleClicked:false
                })
                console.log(foundMovie)
            }
            // if the title is not found, we show not found error
            catch (error) {
                this.setState({
                    notFoundError:`Couldn't find ${this.state.inputValue}`,
                    inputValue:"",
                })
            }
        }
    }

    // handleOnTitle = async (title,year)=>{
    //     try {
    //         let foundMovie = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&t=${title}&y=${year}`)
    //         console.log(foundMovie)
    //         this.setState({
    //             title:foundMovie.data.Title,
    //             poster:foundMovie.data.Poster,
    //             genre:foundMovie.data.Genre,
    //             released:foundMovie.data.Released,
    //             runtime:foundMovie.data.Runtime,
    //             director:foundMovie.data.Director,
    //             actors:foundMovie.data.Actors,
    //             plot:foundMovie.data.Plot,
    //             notFoundError:"",
    //             titleClicked:true
    //         })
    //     }
    //     catch (error) {
    //         this.setState({
    //             notFoundError:`Couldn't find ${this.state.inputValue}`,
    //             inputValue:"",
    //         })
    //     }
    // }

    // handle input on change
    handleOnChange = (event)=>{
        this.setState({
            inputValue:event.target.value
        }
        )
    }
// we define show movie list function to use in render
    showMovieList = () => {
        return <ul className="display">
            {/* we loop through every item and path keys, title, year and poster src to List component */}
            {this.state.movieList.map((item)=>{
                return <List
                key={item.imdbID}
                title = {item.Title}
                year = {item.Year}
                src = {item.Poster}
                
                // handleOnTitle = {this.handleOnTitle} 
                />
            })}
        </ul>
            };


    render() {
        return (
            <div className="main">
                <form className="form1" action="" onSubmit={this.handleSubmit}>
                    <input className="titleInput" type="text" value={this.state.inputValue} onChange={this.handleOnChange}/>
                    <button className="titleButton" type="submit">
                    Submit
                    </button>
                </form>
                <br />
                <span className="span">{this.state.notFoundError}</span>


                
                {/* {this.state.titleClicked ?
                (<div className="oneMovie">
                    <h3 className="titleOne">{this.state.title}</h3>
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
                ):(
                <ul className="display">
                    {this.state.movieList.map((item)=>{
                        return <List
                        key={item.imdbID}
                        title = {item.Title}
                        year = {item.Year}
                        src = {item.Poster}
                        // handleOnTitle = {this.handleOnTitle} 
                        />
                    })}
                
                </ul>

                )} */}
                {/* show movie list */}
                {this.showMovieList()}
            
            </div>
        )
    }
}
// export Movie
export default Movie
