import * as ethers from "ethers"
import * as dotenv from "dotenv"

import * as stakingABT from "./staking.json"

dotenv.config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://babel-api.testnet.iotex.io")

    const privateKey = process.env.PRIVATE_KEY
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wallet = new ethers.Wallet(privateKey!, provider)

    const staking = new ethers.Contract(
        "0x04c22afae6a03438b8fed74cb1cf441168df3f12",
        stakingABT.abi,
        wallet
    )

    const tx = await staking.createStake(
        "robotbp00001",
        ethers.utils.parseEther("100"),
        1, // 1 days
        true,
        []
    )
    const receipt = await tx.wait()
    if (receipt.status !== 1) {
        console.log(`create stake fail`)
        return
    }
    console.log(`create bucket ${ethers.BigNumber.from(receipt.events[0].topics[1]).toString()} with tx ${tx.hash}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
