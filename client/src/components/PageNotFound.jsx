import React from 'react'
import Layout from './Layout/Layout'
import Footer from './Footer/Footer'

const PageNotFound = () => {
  return (
    <Layout>
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height:'80vh'}}>
            <div><h1 className='fw-bold display-1'>404</h1></div>
            <div><h3>Page Not Found :/</h3></div>
        </div>
        <div
        style={{
          position: "static",
          bottom: "0",
          width: "100vw",
          margin:'0'
        }}
        className="c0"
      >
        <Footer />
      </div>
    </Layout>
  )
}

export default PageNotFound