import React, { Component } from 'react'
import ghst from './ghst.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
        <img src={"./porto;.svg"}/>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} GHST</td>
              <td>{window.web3.utils.fromWei(this.props.ghstEarned, 'Ether')} GHST</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={ghst} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; GHST
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UN-STAKE...
              </button>
          </div>
        </div>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault()
              this.props.mintToken()
            }}>
            Mint Token
          </button>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault()
              this.props.issueToken()
            }}>
            Issue Token
          </button>
      </div>
    );
  }
}

export default Main;
