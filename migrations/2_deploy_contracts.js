var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  console.log('DEPLOYER', deployer);
  deployer.deploy(SimpleStorage);
};
