pragma solidity ^0.4.18;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";

/**
 * @title UprightlyProtocolToken
 * @dev ERC20 and ERC827 token
 */
contract UprightlyProtocolToken is ERC827Token {

  string public constant name = "UprightlyProtocolToken"; // solium-disable-line uppercase
  string public constant symbol = "UPT"; // solium-disable-line uppercase
  uint8 public constant decimals = 18; // solium-disable-line uppercase

  uint256 public constant INITIAL_SUPPLY = 1000000000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function UprightlyProtocolToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }

}
