import Head from 'next/head'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import Web3 from 'web3'
import Contract from '../blockchain/index'
import styles from '../styles/Fundraising.module.css'

export default function Home() {
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [error, setError] = useState('')
    const [contract, setContract] = useState(null)
    const [owner, setOwner] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [amountRaised, setAmountRaised] = useState('')
    const [donationAmount, setDonationAmount] = useState('')
    const [hasEnded, setHasEnded] = useState('')


    // load provider
    useEffect(() => {
        const loadProvider = async() => {
            if(typeof window !== 'undefined' && typeof window.ethereum !== "undefined"){
                try{
                    const web3 = new Web3(window.ethereum)
                    setWeb3(web3)
    
                    // get account address
                    const accounts = await web3.eth.getAccounts()
                    setAddress(accounts[0])

                    // Reload page if metamask account or chain ID is changed
                    window.ethereum.on("accountsChanged", accounts => window.location.reload())
                    window.ethereum.on("chainChanged", accounts => window.location.reload())

                    // create local copy of the smart contract
                    const contract = Contract(web3)
                    setContract(contract)
                }
                catch(err){
                    setError(err.message)
                }
            }
            else{
                console.error("Please install Metamask");
            }
        }

        loadProvider()
    }, [])
    
    // handle connection to metamask
    const connectWalletHandler = async() => {
        try{
            await window.ethereum.request({method: "eth_requestAccounts"})
            window.location.reload()
        }
        catch(err){
            alert(err.message)
        }
        
    }

     // extract variables and functions from contract
    useEffect(() => {

        if(contract) getContractVariables();
        
    }, [contract])

    const getContractVariables = async() => {
        // get owner address
        const owner = await contract.methods.owner().call()
        setOwner(owner)

        // get amountToBeRaised
        const amountToBeRaised = await contract.methods.amountToBeRaised().call()
        setTargetAmount(web3.utils.fromWei(amountToBeRaised, "ether"))

        // get amountRaised
        const amountRaised = await contract.methods.amountRaised().call()
        setAmountRaised(web3.utils.fromWei(amountRaised))

        // get hasEnded value
        const hasEnded = await contract.methods.hasEnded().call()
        setHasEnded(hasEnded)
    } 

    // handle the donation form
    const formHandler = (event) => {
        donate()
        event.preventDefault()
    }

    // handle the donation
    const donate = async() => {
        try{
            await contract.methods.donate().send({
                from: address,
                value: web3.utils.toWei(donationAmount, "ether")
            })
        }
        catch(err){
            alert(err.message)
        }

        window.location.reload()
    }

    // end the campaign
    const endCampaign = async() => {
        await contract.methods.endCampaign().send({
            from: address
        })
        
        alert("campaign has been ended successfully!")
    }

    // handle withdrawal
    const withdraw = async() => {
        if(hasEnded){
            try{
            await contract.methods.withdraw().send({
                from: address
                })
            }
            catch(err){
                alert(err.message)
            }

            alert("Your withdrawal was successful!")
        }
        else{
            alert('You can not withdraw the funds till the campaign is ended')
        }
        
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>FundETH</title>
        <meta name="description" content="An Ethereum based blockchain funding platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {/* Navbar */}
        <navbar className={styles.navbar}>
          <a href="/"><logo className={styles.logo}>FundEth</logo></a>
          <login className={styles.login}>
            <button className={styles.login_btn} onClick={connectWalletHandler}>
                {
                    address ? (
                    <div>
                        {address.slice(0, 3)}...{address.slice(35)}
                    </div>
                    ) : 
                    (
                        "Login"
                    )
                }
            </button>
          </login>
        </navbar>

        {/* Content */}
        <section className={styles.content}>
            <section className={styles.image}>
                <img src="https://media.istockphoto.com/photos/sickness-seasonal-virus-problem-concept-woman-being-sick-having-flu-picture-id1175000095?k=20&m=1175000095&s=612x612&w=0&h=_9o8sYoOI-DtNEt-YXv3a3Bhd1KxauSLQCay2qYGvO0=" className={styles.image} width="100%" />
            </section>

            <section className={styles.payment}>
                <h1>Funding for Sarah's Surgery</h1>
                <hr />
                <h2><span>{amountRaised} ETH</span> raised of {targetAmount} ETH</h2>
                <p>Organized By: Nnam Darlington</p>
                <p>Email: Darlingtonnnam@gmail.com</p>
                <p>Category: Health</p>
                <h3>Description:</h3>
                <p>Little Sarah has a failed kidney and is in need of a new kidney in order to get back to good health. The new kidney cost approximately 50ETH, and we need that much money before we can proceed with the surgery.</p>

                <div>
                    <p className="cxn-check">Address: {owner}</p>
                    <form onSubmit={formHandler}>
                        <input type="text" className={styles.donate_input} placeholder="Enter donation amount" onChange={event => setDonationAmount(event.target.value)}/> 
                        <input type="submit" className={styles.donate_btn} value="Donate" />
                    </form>

                    {address == owner? (
                        <section className={styles.btn_group}>
                            <button className={styles.end} onClick={endCampaign}>End Campaign</button>
                            <button className={styles.withdraw} onClick={withdraw}>Withdraw</button>
                        </section>
                    ) :
                    (
                        <section className={styles.instructions}>
                            <p>To use this Application effectively:</p>
                            <ul className={styles.instructions_list}>
                                <li>Donwload Metamask Wallet</li>
                                <li>Ensure you are on the Rinkeby testnet</li>
                                <li>Get Rinkeby test ethers from <a href="https://rinkebyfaucet.com">HERE</a></li>
                            </ul>
                        </section>
                    )
                    }
                
                </div>
            </section>
        </section>
    </div>
  )
}
