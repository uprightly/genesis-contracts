pragma solidity ^0.4.18;

import "../node_modules/zeppelin-solidity/contracts/crowdsale/FinalizableCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "./UprightlyProtocolToken.sol";

/**
 * @title SampleCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 * The way to add new features to a base crowdsale is by multiple inheritance.
 *
 */
contract UprightlyCrowdsale is FinalizableCrowdsale {

  function UprightlyCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) public
    FinalizableCrowdsale()
    Crowdsale(_startTime, _endTime, _rate, _wallet)
  {

  }

  function createTokenContract() internal returns (MintableToken) {
    return new UprightlyProtocolToken();
  }

  /**
   * After the crowdsale has ended, this will be called.
   *
   * Here we mint tokens for the Team to meet the allocated
   * percentages as described in the whitepaper.
   *
   */
  function finalization() internal {
    super.finalization();

    uint256 totalTokensFromCrowdsale = token.totalSupply(); // 60%

    uint256 teamTokens = totalTokensFromCrowdsale * 28 / 60; // 28%
    uint256 bountyTokens = totalTokensFromCrowdsale * 2 / 60; // 2%
    uint256 futureIcoTokens = totalTokensFromCrowdsale * 10 / 60; // 10%

    token.mint(owner, teamTokens);
    token.mint(owner, bountyTokens);
    token.mint(owner, futureIcoTokens);

    // crowdsale is over at this point. No more tokens will be created.
    token.finishMinting();
  }
}
