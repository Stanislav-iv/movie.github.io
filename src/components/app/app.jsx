import React, { Component } from 'react'
import { Pagination, Row, Tabs } from 'antd'
import { debounce } from 'lodash'

import MovieService from '../../services/MovieService'
import MovieList from '../MovieList/MovieList'
import MovieRate from '../MovieRate/MovieRate'
import SearchMovie from '../SearchMovie/SearchMovie'
import Spiner from '../spiner/spiner'
import ErrorMovie from '../error/errorMovie'
import { GenreProvider } from '../genreContext'
import '../Scss/app.scss'

export default class App extends Component {
  movieService = new MovieService()
  state = {
    movies: [],
    loading: true,
    error: false,
    totalPages: 0,
    value: 'return',
    getSession: '',
    moviesRate: [],
    genre: [],
  }

  componentDidMount() {
    this.onSession()

    this.updateMovie(this.state.value, 1)
    this.updateGenre()
  }
  onSession() {
    this.movieService.getGuestSession().then((session) => {
      this.setState({ getSession: session.guest_session_id })
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  async updateRate(session) {
    try {
      const res = await this.movieService.getRate(session)

      this.setState({
        moviesRate: res.results,
      })
    } catch (error) {
      this.onError(error)
    }
  }
  updateMovie(title, page) {
    this.movieService
      .getTitle(title, page)
      .then((original) => {
        this.setState({
          movies: original.results,
          loading: false,
          totalPages: original.total_pages,
        })
      })
      .catch(this.onError)
  }
  updateGenre() {
    this.movieService
      .getGenre()
      .then((original) => {
        this.setState({
          genre: original.genres,
        })
      })

      .catch(this.onError)
  }

  onSearchChange = debounce((e) => {
    this.updateMovie(e.target.value, 1)
    this.setState({
      value: e.target.value,
    })
  }, 400)
  textView(text) {
    if (text.length >= 110) {
      text = text.substring(0, 110)
      let lastIndex = text.lastIndexOf(' ')
      text = text.substring(0, lastIndex) + '...'
      return text
    } else {
      return text
    }
  }

  render() {
    const { movies, loading, error, totalPages, getSession, moviesRate, genre } = this.state
    const hasData = !(loading || error)
    const errorMovies = error ? <ErrorMovie /> : null
    const spinner = loading ? <Spiner /> : null
    const notLoading = movies.length === 0 ? <p> not results</p> : null
    const view = hasData ? (
      <MovieList
        movies={movies}
        textView={this.textView}
        getSession={getSession}
        ratePost={this.ratePost}
        moviesRate={moviesRate}
      />
    ) : null

    return (
      <GenreProvider value={genre}>
        <Tabs
          defaultActiveKey="tab1"
          className="tabs"
          onChange={() => {
            this.updateRate(getSession)
          }}
        >
          <Tabs tab="Search" key="tab1" className="tabs__content">
            <SearchMovie onSearchChange={this.onSearchChange} />
            {spinner}
            {view}
            {notLoading}
            {errorMovies}
            <Row justify={'center'}>
              <Pagination
                onChange={(page) => {
                  this.updateMovie(this.state.value, page)
                  this.updateRate(getSession)
                }}
                defaultCurrent={1}
                total={totalPages}
              />
            </Row>
          </Tabs>

          <Tabs tab="Rated" key="tab2">
            <MovieRate moviesRate={moviesRate} getSession={getSession} textView={this.textView} />
          </Tabs>
        </Tabs>
      </GenreProvider>
    )
  }
}
