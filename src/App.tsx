import React from 'react'
import { Root } from 'react-static'
import Index from './pages'
import './app.css'

function App() {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <Root>
          <React.Suspense fallback={<em>Loading...</em>}>
          <Index/>
          </React.Suspense>
    </Root>
    </>
  )
}

export default App
