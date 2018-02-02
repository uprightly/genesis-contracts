const UprightlyProtocolToken = artifacts.require("UprightlyProtocolToken");

/**
 * Simple integration test just to show that the ERC20 and ERC827
 * functionality still works combined with MintableToken
 */
contract('UprightlyProtocolToken', function (accounts) {
  beforeEach(async function () {
    this.token = await UprightlyProtocolToken.new();
  });

  it("should start at zero", async function () {
    const result = await this.token.totalSupply();
    assert.equal(result.toNumber(), 0);
  });

  it("should mint", async function () {
    await this.token.mint(web3.eth.accounts[0], 100);
    const result = await this.token.balanceOf(web3.eth.accounts[0]);
    assert.equal(result.toNumber(), 100);
  });

  it("should transfer", async function () {
    await this.token.mint(web3.eth.accounts[0], 100);
    await this.token.transfer(web3.eth.accounts[1], 100);

    const receiverBalance = await this.token.balanceOf(web3.eth.accounts[1]);
    const ownerBalance = await this.token.balanceOf(web3.eth.accounts[0]);

    assert.equal(receiverBalance.toNumber(), 100);
    assert.equal(ownerBalance.toNumber(), 0);
  });
});
