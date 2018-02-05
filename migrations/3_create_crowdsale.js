var UprightlyCrowdsale = artifacts.require("./UprightlyCrowdsale.sol");
var UprightlyProtocolToken = artifacts.require("./UprightlyProtocolToken.sol");

/**
 * returns days in seconds
 * @param {number} n
 */
function days(n) {
  return 86400 * n;
}

/**
 * returns current unix timestamp in seconds
 */
function timestamp() {
  return Math.round(new Date() / 1000);
}

module.exports = function (deployer, network, accounts) {

  const startTime = timestamp() + days(12);
  const endTime = startTime + days(30);
  const rate = 1000;
  const wallet = accounts[0];

  return deployer.deploy(UprightlyCrowdsale, startTime, endTime, rate, wallet, UprightlyProtocolToken.address).then(() => {
    UprightlyProtocolToken.deployed().then(instance => {
      instance.transferOwnership(UprightlyCrowdsale.address);
    });
  });


};
