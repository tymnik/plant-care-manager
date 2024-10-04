import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Loader from '../Loader'
import Header from '../Header'

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}><Outlet /></Suspense>
    </>
  )
}

export default Layout