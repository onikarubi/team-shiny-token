import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployContractFixture() {
  const [owner, account1, account2] = await ethers.getSigners();
  const ERC20 = await ethers.getContractFactory("MyToken", owner);
  const token = await ERC20.deploy("MyToken", "MTK");
  await token.deployed();
  return { token, owner, account1, account2 };
}

async function deployMintContractFixture() {
  const [owner, account1, account2] = await ethers.getSigners();
  const ERC20 = await ethers.getContractFactory("MyToken", owner);
  const token = await ERC20.deploy("MyToken", "MTK");
  await token.deployed();
  
  const decimals = await token.decimals();
  const amount = ethers.utils.parseUnits('1000', decimals);
  await token.mint(owner.address, amount);
  return { token, owner, account1, account2 };
}

describe('MyToken', () => {
  describe('Testing for Deployment', () => {
    it('deployed contract', async () => {
      const { token } = await loadFixture(deployContractFixture);
      expect(await token.name()).to.equal("MyToken");
    });
  });

  describe('Testing for mint', () => {
    it('Mint the token', async () => {
      const { token, owner } = await loadFixture(deployContractFixture);
      const decimals = await token.decimals();
      const amount = ethers.utils.parseUnits('1000', decimals);
      await token.mint(owner.address, amount);
      expect(await token.balanceOf(owner.address)).to.equal(amount);
    });

    it('reverted with caller is not the owner', async () => {
      const { token, account1 } = await loadFixture(deployContractFixture);
      const decimals = await token.decimals();
      const amount = ethers.utils.parseUnits('1000', decimals);
      await expect(token.connect(account1).mint(account1.address, amount)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe('Testing for approve', () => {
    it('approve the token', async () => {
      const { token, owner, account1 } = await loadFixture(deployMintContractFixture);
      const decimals = await token.decimals();
      const amount = ethers.utils.parseUnits('1000', decimals);
      await token.approveOnlyOwner(amount);
    });
  });
});