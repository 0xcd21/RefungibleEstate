import React, { Component } from 'react'

import portolGif from './portal.gif'

class SummonGotchi extends Component {

  render() {
    return (
      <center>
        <div id="content" className="mt-5" style={{
          width: '50%', maxHeight: '500px'
        }
        }>
          <img onClick={() => this.props.history.push('/form')} alt='summon' src={portolGif} style={{ width: '100%', height: '450px' }} />
          <br />
          <br />
          <b>Click on door to summon the gotchi</b>
        </div >
      </center>
    );
  }
}

export default SummonGotchi;
