import React, { Component } from 'react'
import { Row } from 'antd'

import MovieItem from '../MovieItem/MovieItem'

import './MovieList.css'

export default class MovieList extends Component {
  render() {
    const { movies, textView, getSession, moviesRate } = this.props

    return (
      <Row className="movieList" justify={'space-between'} gutter={[-60, 16]}>
        {movies.map((movie) => {
          return (
            <MovieItem
              key={movie.id}
              textView={textView}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              release_date={movie.release_date}
              getSession={getSession}
              moviesRate={moviesRate}
              genreIds={movie.genre_ids}
            />
          )
        })}
      </Row>
    )
  }
}
