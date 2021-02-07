import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Home from '../Home'
import Footer from '../Footer'
import CreateLand from '../CreateLand'
import NavigationBar from '../NavigationBar'
import LandRenderer from '../LandScreen'
import Aavegotchi from '../Aavegotchi'
import SummonGotchi from '../Aavegotchi/gotchiForm'
//import AaveGotchiStake from '../Aavegotchi/aavegotchiStake'


class Main extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/create/land" component={CreateLand} />
          <Route path="/renderLand" component={LandRenderer} />
          <Route path="/aavegotchi" component={Aavegotchi} />
          <Route path="/summonGotchi" component={SummonGotchi} />
          {/* <Route path="/stake" component={AaveGotchiStake} /> */}
          <Redirect to="/home" />
        </Switch>
        {/* <Footer /> */}
      </div>
    )
  }
}


export default withRouter(Main);
