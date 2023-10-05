export default class MovieService {
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGJkZDI3MDk4NjI3NjkwYzg0ZTNkYjhhMjI2NGViNyIsInN1YiI6IjY0ZjVhN2U3NzdkMjNiMDEyZThiZDY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qlT24rDRdN0wM0p_S0udhzYcYB6jA-QAl5Ia9IGwPHw',
    },
  }

  async postRes(url, op) {
    const res = await fetch(url, op)
    if (!res.ok) {
      throw new Error('Not fetch ')
    }
    return await res.json()
  }

  async postRate(session, rate, idMovie) {
    await this.postRes(
      `https://api.themoviedb.org/3/movie/${idMovie}/rating?api_key=68bdd27098627690c84e3db8a2264eb7&guest_session_id=${session}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rate),
      }
    )
  }
  async getRes(url) {
    const res = await fetch(url, this.optionsGet)
    if (!res.ok) {
      throw new Error('Not fetch ')
    }
    return await res.json()
  }

  async getResRate(url, op) {
    const res = await fetch(url, op)
    if (!res.ok) {
      throw new Error('Not fetch ')
    }
    return await res.json()
  }

  async getGuestSession() {
    const res = await this.getRes('https://api.themoviedb.org/3/authentication/guest_session/new', this.optionsGet)

    return res
  }

  async getTitle(text, pages) {
    const res = await this.getRes(
      `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=68bdd27098627690c84e3db8a2264eb7&include_adult=false&language=en-US&page=${pages}`,
      this.optionsGet
    )
    return res
  }

  async getRate(session) {
    const res = await this.getResRate(
      `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?api_key=68bdd27098627690c84e3db8a2264eb7&language=en-US&page=1&sort_by=created_at.asc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    )
    return res
  }

  async getGenre() {
    const res = await this.getRes('https://api.themoviedb.org/3/genre/movie/list?language=en', this.optionsGet)
    return res
  }
}
