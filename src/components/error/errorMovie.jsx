import React, { useState } from 'react'
import { Alert, Button } from 'antd'
const { ErrorBoundary } = Alert
const ThrowError = () => {
  const [error, setError] = useState()
  const onClick = () => {
    setError(new Error('An Uncaught Error'))
  }
  if (error) {
    throw error
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  )
}
const ErrorMovie = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
)
export default ErrorMovie
