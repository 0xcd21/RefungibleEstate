const CreateLandNft = artifacts.require("CreateLandNft");


module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(CreateLandNft);
};
