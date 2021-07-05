import React, { Component } from 'react'
import "./Movie.css"
import { Link, NavLink } from "react-router-dom";

// this is where we handle list of movies
export class List extends Component {
    render() {
        console.log(this.props)
        return (
            <Link
            // we redirect it to movie detail page by using pathname
                to={{
                pathname: `/movie-detail/${this.props.title}`,
                search: `?t=${this.props.title}`,
                }}
                >
                    <li className="li">
                        {/* show title */}
                        <h2 className="title"
                        // onClick ={()=>this.props.handleOnTitle(this.props.title, this.props.year)}
                        >{this.props.title}</h2>
                        {/* year */}
                        <h3 className="year">{this.props.year}</h3>
                        {/* poster */}
                        <img alt="" src={this.props.src} />
                    </li>
            </Link>
        )
    }
}

export default List
