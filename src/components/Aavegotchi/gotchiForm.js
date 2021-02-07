import React, { Component } from 'react'

import portolGif from './portal.gif'

class SummonGotchi extends Component {

  render() {
    return (
      <center>
        <div id="content" className="mt-0" style={{
          width: '50%', maxHeight: '573px'
        }
        }>
          <img onClick={() => this.props.history.push('/form')} alt='summon' src={portolGif} style={{ width: '100%', height: '573px' }} />
        </div >
      </center>
    );
  }
}

export default SummonGotchi;
