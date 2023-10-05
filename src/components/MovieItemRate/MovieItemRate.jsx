import React, { Component } from 'react'
import { Row, Col, Rate } from 'antd'
import { format } from 'date-fns'

import './MovieItemRate.css'
import MovieService from '../../services/MovieService'
import { GenreConsumer } from '../genreContext'

export default class MovieItemRate extends Component {
  movieService = new MovieService()
  ratePost(session, rate, idMovie) {
    this.movieService.postRate(session, rate, idMovie)
  }
  getGenre(arrMovie, arrGenre) {
    let res = []
    arrMovie.forEach((el1) => {
      arrGenre.forEach((el2) => {
        if (el1 === el2.id) {
          res.push(el2)
        }
      })
    })

    return res.map((el) => {
      return <p key={el.id}>{el.name}</p>
    })
  }

  render() {
    const { title, overview, release_date, poster_path, textView, id, getSession, rating, genreIds } = this.props
    const date = release_date ? <p> {format(new Date(release_date), 'MMMM d, yyyy')}</p> : null
    return (
      <Col>
        <Row wrap={false} className="movieItem">
          <Col flex="none" className="movieItem__img">
            <img className="movieItem__img" alt="poster" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
          </Col>
          <div className="movieItem__info">
            <div className="movieItem__head">
              <p className="movieItem__title">{title}</p>
              <div
                className={
                  rating <= 3
                    ? 'movieRate__circl_red'
                    : rating <= 5
                    ? 'movieRate__circl_or'
                    : rating <= 7
                    ? 'movieRate__circl_yl'
                    : rating > 7
                    ? 'movieRate__circl_gr'
                    : 'movieRate__circl_red'
                }
              >
                {rating}
              </div>
            </div>

            {date}
            <GenreConsumer>
              {(genre) => {
                return (
                  <div className="movieItem__genre" key={genreIds}>
                    {this.getGenre(genreIds, genre)}
                  </div>
                )
              }}
            </GenreConsumer>
            <p className="movieItem__description">{textView(overview)}</p>
            <Rate
              className="movieItem__rate"
              value={rating}
              count={10}
              allowHalf
              onChange={(value) => {
                this.ratePost(getSession, { value }, id)
              }}
            />
          </div>
        </Row>
      </Col>
    )
  }
}
