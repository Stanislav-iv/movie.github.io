import React, { Component } from 'react'
import { Form, Input } from 'antd'
import './SearchMovie.css'
export default class SearchMovie extends Component {
  render() {
    const { onSearchChange } = this.props
    return (
      <Form className="searchMovie__form">
        <Input type="text" placeholder="Type to search..." onChange={onSearchChange}></Input>
      </Form>
    )
  }
}
