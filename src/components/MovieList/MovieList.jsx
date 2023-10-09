import React from 'react'
import { Row } from 'antd'

import MovieItem from '../MovieItem/MovieItem'

const MovieList = ({ movies, textView, getSession, moviesRate }) => {
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
            voteAverage={movie.vote_average}
          />
        )
      })}
    </Row>
  )
}

export default MovieList
