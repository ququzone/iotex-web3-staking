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

    const index = 201
    const tx = await staking.unstake(
        index,
        []
    )
    const receipt = await tx.wait()
    if (receipt.status !== 1) {
        console.log(`unstake bucket fail`)
        return
    }
    console.log(`unstake bucket #${index} with tx ${tx.hash}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
