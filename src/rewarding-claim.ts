import * as ethers from "ethers"
import * as dotenv from "dotenv"

import * as rewardingABI from "./rewarding.json"

dotenv.config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://babel-api.testnet.iotex.io")

    const privateKey = process.env.PRIVATE_KEY
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wallet = new ethers.Wallet(privateKey!, provider)

    const rewarding = new ethers.Contract(
        "0xa576c141e5659137ddda4223d209d4744b2106be",
        rewardingABI.abi,
        wallet
    )

    const tx = await rewarding.claim(ethers.utils.parseEther("1.0"), [])
    console.log(`claim rewarding with tx ${tx.hash}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
