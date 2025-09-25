import React, { useState, useEffect } from 'react'

// シンプルなルーター実装
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentPath })
    }
    return child
  })
}

export const Route = ({ path, component: Component, currentPath }) => {
  if (currentPath === path) {
    return <Component />
  }
  return null
}

export const Link = ({ to, children, onClick, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
    if (onClick) onClick()
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

