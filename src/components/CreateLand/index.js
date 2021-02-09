import Web3 from 'web3';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Spinner } from 'reactstrap';

import './style.css';


class CreateLand extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: '',
      name: '',
      loading: true,
      symbol: '',
      touched: {
        name: false,
        symbol: false
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.loadWeb3 = this.loadWeb3.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) window.web3 = new Web3(window.web3.currentProvider)
    else window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // const networkId = await web3.eth.net.getId()
    // const networkData = Token.networks[networkId]

    // if (networkData) {
    //   const film = new web3.eth.Contract(Token.abi, networkData.address)
    //   this.setState({ film })

    this.setState({ loading: false })

    // } else {
    //   window.alert("FilmFactory contract is not deployed to detected network")
    // }
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    let value = null

    value = target.value

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate(
      this.state.name,
      this.state.symbol,
    )

    if (errors.name !== '' && errors.symbol !== '') {
      return
    }

    // this.state.film.methods.createFilm(
    //   this.state.filmname.trim(),
    //   Number(this.state.budget),
    //   this.state.directorname.trim(),
    //   posterIpfs.path,
    //   scriptIpfs.path,
    //   this.state.description,
    //   Number(this.state.interestrate),
    //   this.state.category
    // ).send({ from: this.state.account })
    //   .once('receipt', (receipt) => {
    //     this.setState({ loading: false, loadingMessage: '' })

    //     this.props.history.push('/home')
    //   })
  }

  validate(name, symbol) {
    const errors = {
      name: '',
      symbol: ''
    }

    if (this.state.touched.name && name.length < 3)
      errors.name = 'Land name should be >= 3 characters'
    else if (this.state.touched.name && name.length > 20)
      errors.name = 'Land name should be <= 10 characters'

    if (this.state.touched.symbol && symbol.length < 3)
      errors.symbol = 'Land symbol should be >= 3 characters'
    else if (this.state.touched.symbol && symbol.length > 20)
      errors.symbol = 'Land symbol should be <= 10 characters'

    return errors
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <center style={{ padding: '100px' }}>
          <Spinner animation="border" size="lg" role="status">
          </Spinner>
        </center>
      )
    }

    const errors = this.validate(
      this.state.name, this.state.symbol
    )

    return (
      <div className="container-fluid">
        <div className="row forming">
          <Form onSubmit={this.handleSubmit} className="mt-5 form-container col-12 col-md-9">
            <h2 className="text-center">Create Land</h2>
            <br />
            <FormGroup row>
              <Label htmlFor="landname" md={2}>Land name</Label>
              <Col md={10}>
                <Input className='input' type="text" id="landname" name="landname"
                  placeholder="Enter land's name"
                  value={this.state.name || 'deep'}
                  valid={errors.name === ''}
                  invalid={errors.name !== ''}
                  onBlur={this.handleBlur('name')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.name}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="symbol" md={2}>Land symbol</Label>
              <Col md={10}>
                <Input className='input' type="text" id="landsymbol" name="landsymbol"
                  placeholder="Enter land's symbol"
                  value={this.state.symbol || 'deep'}
                  valid={errors.symbol === ''}
                  invalid={errors.symbol !== ''}
                  onBlur={this.handleBlur('symbol')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.symbol}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="danger">
                  Create request/ Demo Your Land
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}


export default CreateLand;
