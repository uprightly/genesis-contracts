pragma solidity ^0.4.18;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";

/**
 * @title UprightlyProtocolToken
 * @dev ERC20 and ERC827 token
 */
contract UprightlyProtocolToken is ERC827Token, MintableToken {

  string public constant name = "UprightlyProtocolToken"; // solium-disable-line uppercase
  string public constant symbol = "UPT"; // solium-disable-line uppercase
  uint8 public constant decimals = 18; // solium-disable-line uppercase

}
