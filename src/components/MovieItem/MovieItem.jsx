import React from 'react'
import { Row, Col, Rate } from 'antd'
import { format } from 'date-fns'

import MovieService from '../../Services/MovieService'
import { GenreConsumer } from '../GenreContext'

const MovieItem = ({
  title,
  overview,
  release_date,
  textView,
  id,
  poster_path,
  getSession,
  genreIds,
  voteAverage,
  moviesRate,
}) => {
  const movieService = new MovieService()

  const ratePost = (session, rate, idMovie) => {
    movieService.postRate(session, rate, idMovie)
  }

  const getGenre = (arrMovie, arrGenre) => {
    let res = []
    arrMovie.forEach((el1) => {
      arrGenre.forEach((el2) => {
        if (el1 === el2.id) {
          res.push(el2)
        }
      })
    })

    return res.map((el) => {
      return <p key={el.id}>{el.name} </p>
    })
  }
  const stars = (id, arrRated) => {
    let res = []
    arrRated.map((el) => {
      if (id === el.id) {
        res.push(el.rating)
      }
    })
    return Number(res)
  }

  const getVoteAverage = (rateNum) => {
    if (rateNum <= 3) {
      return 'movieRate__circl_red'
    }
    if (rateNum <= 5) {
      return 'movieRate__circl_or'
    }
    if (rateNum <= 7) {
      return 'movieRate__circl_yl'
    }
    if (rateNum > 7) {
      return 'movieRate__circl_gr'
    } else {
      return 'movieRate__circl_red'
    }
  }

  const date = release_date ? (
    <p className="movieItem__date"> {format(new Date(release_date), 'MMMM d, yyyy')}</p>
  ) : null

  return (
    <Row wrap={false} className="movieItem">
      <Col flex="none" className="movieItem__img">
        <img className="movieItem__img" alt="poster" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
      </Col>
      <div className="movieItem__info">
        <div className="movieItem__head">
          <p className="movieItem__title">{title}</p>
          <div className={getVoteAverage(voteAverage)}>{voteAverage.toFixed(1)}</div>
        </div>

        {date}
        <GenreConsumer>
          {(genre) => {
            return <div className="movieItem__genre">{getGenre(genreIds, genre)}</div>
          }}
        </GenreConsumer>

        <p className="movieItem__description">{textView(overview)}</p>
        <Rate
          className="movieItem__rate"
          defaultValue={stars(id, moviesRate)}
          count={10}
          allowHalf
          onChange={(value) => {
            ratePost(getSession, { value }, id)
          }}
        />
      </div>
    </Row>
  )
}
export default MovieItem
