pragma solidity ^0.4.17;
import '../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import '../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol';
    
contract ZipToken is StandardToken, Ownable {
    string public constant NAME = "ZipperToken";
    string public constant SYMBOL = "ZIP";
    uint8 public constant DECIMALS = 18;
    uint public constant TOTAL_TOKEN_AMOUNT = 1000000000;
    uint public constant INITIAL_SUPPLY = TOTAL_TOKEN_AMOUNT * 10**uint(DECIMALS);

    function ZipToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}