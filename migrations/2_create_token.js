var UprightlyProtocolToken = artifacts.require("./UprightlyProtocolToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UprightlyProtocolToken);
};
