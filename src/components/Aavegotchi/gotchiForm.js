import React, { Component } from 'react'
import ghst from './ghst.png'
import militaryGotchi from './militaryGotchi.png'
import portolGif from './portal.gif'

class SummonGotchi extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
        <img src={portolGif} />
      </div>
    );
  }
}

export default SummonGotchi;
