const GhstToken = artifacts.require('GhostToken')
const AavegotchiFacet = artifacts.require('AavegotchiFacet')
const Aavegotchi = artifacts.require('Aavegotchi')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Aavegotchi)
  
  await deployer.deploy(GhstToken)
  const ghstToken = await GhstToken.deployed()

  await deployer.deploy(AavegotchiFacet, ghstToken.address)
  const aavegotchiFacet = await AavegotchiFacet.deployed()

  await ghstToken.transfer(accounts[0], '100000000000000000000')
}