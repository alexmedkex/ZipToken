var ZipToken = artifacts.require("./ZipToken.sol");
var TokenVesting = artifacts.require("../node_modules/zeppelin-solidity/contracts/token/ERC20/TokenVesting.sol");

contract('ZipToken', function (accounts) {
  
  it("should put 1000000000 (one billion) ZIP in the owner's account.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    const totalSupply = await zip.totalSupply();
    assert(totalSupply.eq(1000000000*10**18));
  });
  
  it("should distribute tokens.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    var values = [10, 20];
    var addresses = [accounts[1], accounts[2]];
    await zip.distributeTokens(addresses, values, { from: owner });
    await zip.transferFrom(owner, accounts[1], 10, { from: accounts[1] });
    await zip.transferFrom(owner, accounts[2], 20, { from: accounts[2] });
    var balance1 = await zip.balanceOf(accounts[1]);
    var balance2 = await zip.balanceOf(accounts[2]);
    assert.equal(balance1.toString(), '10');
    assert.equal(balance2.toString(), '20');
  });

  it("should vest tokens.", async function () {
    const owner = accounts[0];
    var timestamp = Math.round((new Date()).getTime() / 1000);
    const zip = await ZipToken.new({ from: owner });
    const vesting = await TokenVesting.new(owner, 0, 10, 60, false, { from: owner });
    await zip.increaseApproval(vesting, 60, { from: owner });
    await zip.transferFrom(owner, vesting, 60, { from: vesting });
    assert.equal(vesting.vestedAmount(zip).toString(), '0');
    setTimeout(function callback() {
      assert(vesting.vestedAmount(zip) > 0);
    }, 10000);

  })

});