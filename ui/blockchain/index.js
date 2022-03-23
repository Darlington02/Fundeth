
const ABI = [{"inputs":[{"internalType":"uint256","name":"_amountToBeRaised","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"amountRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountToBeRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"donate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hasEnded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const Contract = (web3) => {
    return new web3.eth.Contract(
        ABI,
        "0x6b25d8B4EeC042089eF092B861A03950aDdA6Edf"
    )
}

export default Contract