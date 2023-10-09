import React from 'react'
import { Row } from 'antd'

import MovieItemRate from '../MovieItemRate/MovieItemRate'

const MovieRate = ({ getSession, moviesRate, textView }) => {
  return (
    <Row className="movieList" justify={'space-between'} gutter={[50, 16]}>
      {moviesRate.map((movie) => {
        return (
          <MovieItemRate
            key={movie.id}
            textView={textView}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            release_date={movie.release_date}
            getSession={getSession}
            rating={movie.rating}
            genreIds={movie.genre_ids}
            voteAverage={movie.vote_average}
          />
        )
      })}
    </Row>
  )
}
export default MovieRate
