import React from 'react'
import Header from './Header'
import Select from './Select'
import '../css/app.css'
import { Fragment } from 'react'

const App = () => { 
    return (
        <Fragment>
            <Header />
            <h3 id="heading">Compare Driver Statistics</h3>
            <hr></hr>
            <div class="columns">
          <div class="column is-quarter">
            <h3>Choose your first driver from the selection below</h3>
            <Select />
            <br />
            <br />
            <div class="drivers-left"></div>
          </div>
          <div class="column is-quarter">
            <h3>Choose your second driver from the selection below</h3>
            <Select />
            <br />
            <br />
            <div class="drivers-right"></div>
          </div>
        </div>
        </Fragment>
    )
}

export default App;