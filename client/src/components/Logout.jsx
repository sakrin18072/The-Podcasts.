import React from 'react'
import Layout from './Layout/Layout'
import Footer from './Footer/Footer'
const Logout = () => {
  return (
    <Layout>
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height:'80vh'}}>
            <div><h1 className='fw-bold display-1 c3'>Sad to see you go,comeback quick :(</h1></div>
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

export default Logout