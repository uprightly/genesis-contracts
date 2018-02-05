const UprightlyCrowdsale = artifacts.require("UprightlyCrowdsale");
const UprightlyProtocolToken = artifacts.require("UprightlyProtocolToken");

import ether from 'zeppelin-solidity/test/helpers/ether';
import { advanceBlock } from 'zeppelin-solidity/test/helpers/advanceToBlock';
import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

/**
 * Simple integration test just to show that the ERC20 and ERC827
 * functionality still works combined with MintableToken
 */
contract('UprightlyCrowdsale', function ([owner, wallet, investor]) {
  const tokenMintRate = new BigNumber(1000);

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    this.startTime = latestTime() + duration.weeks(1);
    this.endTime = this.startTime + duration.weeks(1);
    this.afterEndTime = this.endTime + duration.seconds(1);

    this.token = await UprightlyProtocolToken.new();

    this.crowdsale = await UprightlyCrowdsale.new(
      this.startTime, this.endTime, tokenMintRate, wallet, this.token.address
    );
    await this.token.transferOwnership(this.crowdsale.address);

  });

  it("should mint the proper rate", async function () {
    const walletOriginalBalance = await web3.eth.getBalance(wallet);

    await increaseTimeTo(this.startTime);

    const totalContributions = ether(1);

    await this.crowdsale.buyTokens(investor, { from: investor, value: totalContributions });

    const totalMinted = totalContributions.mul(tokenMintRate);
    const walletBalanceAfterContributions = walletOriginalBalance.add(totalContributions);

    (await this.token.totalSupply()).should.be.bignumber.equal(totalMinted);
    (await this.token.balanceOf(investor)).should.be.bignumber.equal(totalMinted);
    (await web3.eth.getBalance(wallet)).should.be.bignumber.equal(walletBalanceAfterContributions);
  });

  it("should finalize with the proper token percentages", async function () {
    const walletOriginalBalance = await web3.eth.getBalance(wallet);

    await increaseTimeTo(this.startTime);

    const totalContributions = ether(6);

    await this.crowdsale.buyTokens(investor, { from: investor, value: totalContributions });

    const walletBalanceAfterContributions = walletOriginalBalance.add(totalContributions);

    (await web3.eth.getBalance(wallet)).should.be.bignumber.equal(walletBalanceAfterContributions);

    await increaseTimeTo(this.afterEndTime);
    await this.crowdsale.finalize();

    const contributorAmount = ether(6).mul(tokenMintRate); // 60% of total tokens
    const teamAmount = ether(4).mul(tokenMintRate); // 40% of total tokens

    (await this.token.balanceOf(investor)).should.be.bignumber.equal(contributorAmount);
    (await this.token.balanceOf(owner)).should.be.bignumber.equal(teamAmount);
  });

});
