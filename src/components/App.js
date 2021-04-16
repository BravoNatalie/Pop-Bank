import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank_img from '../dbank.png';
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

 async loadBlockchainData(dispatch) {
  window.addEventListener('load', async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
     if (window.ethereum) {
       const web3 = new Web3(window.ethereum)
       try {
         // Request account access if needed
         await window.ethereum.enable()
         // Acccounts now exposed
         await this.loadState(web3)
       } catch (error) {
         console.alert("User denied account access. ", error);
       }
     }
     // Legacy dapp browsers...
     else if (window.web3) {
       // Use Mist/MetaMask's provider.
       const web3 = window.web3
       console.log('Injected web3 detected.')
       await this.loadState(web3)
     }
     // Non-dapp browsers...
     else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
     }
   });
 }

  async loadState(web3){
    const netID = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    if(typeof accounts[0] === "undefined"){
      window.alert("Please login with Metamask!")
    } else{
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({account: accounts[0], balance, web3})
    }

    try{
      console.log(netID)
      const token = new web3.eth.Contract(Token.abi, Token.networks[netID].address)
      const dBankAddress = dBank.networks[netID].address
      const dbank = new web3.eth.Contract(dBank.abi, dBankAddress)
      this.setState({token, dbank, dBankAddress})
     
    } catch(e){
      console.log("Error", e)
      window.alert("Contracts not deployed to the current network " + netID.toString())
    }
  }

  async deposit(amount) {
    if(this.state.dbank !== "undefined"){
      try{
        await this.state.dbank.methods.deposit().send({gas: 210000, value: amount.toString(), from: this.state.account})
      } catch(e){
        console.log("Error, deposit: ", e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if(this.state.dbank !== "undefined"){
      try{
        await this.state.dbank.methods.withdraw().send({gas: 210000, from: this.state.account})
      } catch(e){
        console.log("Error, withdraw: ", e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
        <img src={dbank_img} className="App-logo" alt="logo" height="32"/>
          <b>dBank</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to dBank</h1>
          <h2>{this.state.account}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                    <br></br>
                    How much do you want to deposit?
                    <br></br>
                    (min. amount is 0.01 ETH)
                    <br></br>
                    (1 deposit is possible at the time)
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmout.value
                      amount = amount * 10**18//convert ether to wei
                      this.deposit(amount)
                    }}>
                      <div className="form-group mr-sm-2">
                        <br></br>
                        <input
                          id="depositAmout"
                          step="0.01"
                          type="number"
                          className="form-control form-control-md"
                          placeholder="amount..."
                          required
                          ref={(input) => {this.depositAmout = input}} 
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">DEPOSIT</button>
                    </form>
                  </div>
                </Tab>
                <Tab eventKey="withdraw" title="Withdraw">
                  <div>
                    <br></br>
                    Do you want to withdraw and take your interest?
                    <br></br>
                    <br></br>
                    <div>
                      <button type="submit" className="btn btn-primary" onClick={(e) => {this.withdraw(e)}}>WITHDRAW</button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;