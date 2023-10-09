import React from 'react'
import { Form, Input } from 'antd'

const SearchMovie = ({ onSearchChange }) => {
  return (
    <Form className="searchMovie__form">
      <Input type="text" placeholder="Type to search..." onChange={onSearchChange}></Input>
    </Form>
  )
}
export default SearchMovie
