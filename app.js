const compound = new Compound(window.ethereum);

const ethSupplyInput = document.getElementById('eth-supply');
const ethSupplyButton = document.getElementById('eth-supply-button');
const ethRedeemInput = document.getElementById('eth-redeem');
const ethRedeemButton = document.getElementById('eth-redeem-button');
const enableEthereumButton = document.getElementById('enable-button');

enableEthereumButton.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts' });
};

ethSupplyButton.onclick = async () => {
  const amount = +ethSupplyInput.value;
  await stake(Compound.ETH, amount);
};

ethRedeemButton.onclick = async () => {
  const amount = +ethRedeemInput.value;
  await unstake(Compound.cETH, amount);
};

async function stake(asset, amount) {
  if (!isNaN(amount) && amount !== 0) {
    try {
      const trx = await compound.supply(asset, amount);
      console.log(asset, 'Supply', amount, trx);
      console.log('Transaction Hash', trx.hash);
    } catch (err) {
        console.log(err);
      alert('ошибка при stake: ' + JSON.stringify(err));
    }
  }
  else{
      alert('Введите количество ETH которую хотите застейкать')
  }
}

async function unstake(asset, amount) {
  if (!isNaN(amount) && amount !== 0) {
    try {
      const trx = await compound.redeem(asset, amount);
      console.log(asset, 'Redeem', amount, trx);
      console.log('Transaction Hash', trx.hash);
    } catch (err) {
        console.log(err);
      alert(JSON.stringify(err));
    }
  }
  else{
    alert('Введите количество cETH которую хотите анстейкать')
}
}

