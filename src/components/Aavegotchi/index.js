import React, { Component } from 'react'
import Web3 from 'web3'
import GhostToken from '../../abis/GhostToken.json'
import AavegotchiFacet from '../../abis/AavegotchiFacet.json'
import Main from './Main'

import './App.css'

class Aavegotchi extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load GhostToken
    const ghtsTokenData = GhostToken.networks[networkId]
    //console.log(GhostToken.abi)
    if (ghtsTokenData) {
      const ghostToken = new web3.eth.Contract(GhostToken.abi, ghtsTokenData.address)
      this.setState({ ghostToken })
      let ghostTokenBalance = await ghostToken.methods.balanceOf(this.state.account).call()
      this.setState({ ghostTokenBalance: ghostTokenBalance.toString() })
    } else {
      window.alert('GhostToken contract not deployed to detected network.')
    }

    // Load AavegotchiFacet
    const aavegotchiData = AavegotchiFacet.networks[networkId]
    if (aavegotchiData) {
      const aavegotchiFacet = new web3.eth.Contract(AavegotchiFacet.abi, aavegotchiData.address)
      this.setState({ aavegotchiFacet })
      let stakingBalance = await aavegotchiFacet.methods.stakingBalance(this.state.account).call()
      let ghstEarned = await aavegotchiFacet.methods.ghstEarned(this.state.account).call()

      this.setState({ stakingBalance: stakingBalance.toString(), ghstEarned: ghstEarned.toString() })
    } else {
      window.alert('AavegotchiFacet contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // stakeTokens = (amount) => {
  //   this.setState({ loading: true })
  //   this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //       this.setState({ loading: false })
  //     })
  //   })
  // }

  stakeTokens = (amount) => {
    console.log(this.state.aavegotchiFacet.address);
    this.setState({ loading: true })
    this.state.ghostToken.methods.approve(this.state.aavegotchiFacet.address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.aavegotchiFacet.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.aavegotchiFacet.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  mintToken = () => {
    this.setState({ loading: true })
    this.state.ghostToken.methods.mint().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  issueTokens = () => {
    this.setState({ loading: true })
    this.state.aavegotchiFacet.methods.issueTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      GhostToken: {},
      AavegotchiFacet: {},
      ghostTokenBalance: '0',
      ghstEarned: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        ghostTokenBalance={this.state.ghostTokenBalance}
        stakingBalance={this.state.stakingBalance}
        ghstEarned={this.state.ghstEarned}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        mintToken={this.mintToken}
        issueToken={this.issueTokens}
      />
    }

    const generateRandomNumber = () => Math.floor(Math.random() * 2) + 2;

    return (
      <div className="col-md-6">
        {/* <h2>{account={this.state.account} }</h2> */}
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-4 mt-5 mb-0 ml-auto mr-auto" style={{ maxWidth: '600px', height: '400px' }}>
              <div className="content mr-auto ml-auto">

                <img src={require(`./${generateRandomNumber()}.png`)} style={{ width: '100%', height: '300px' }} />

              </div>
            </main>
            <main role="main" className="col-6 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Aavegotchi;
