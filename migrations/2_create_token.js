var ProtocolToken = artifacts.require("./ProtocolToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ProtocolToken);
};
