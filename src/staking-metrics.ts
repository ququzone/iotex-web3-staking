import * as ethers from "ethers"
import * as dotenv from "dotenv"

import * as stakingABT from "./staking.json"

dotenv.config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://babel-api.testnet.iotex.io")

    const staking = new ethers.Contract(
        "0x04c22afae6a03438b8fed74cb1cf441168df3f12",
        stakingABT.abi,
        provider
    )

    const totalStakingAmount = await staking.totalStakingAmount()
    console.log(`total staking amount: ${totalStakingAmount}`)

    const bucketsCount = await staking.bucketsCount()
    console.log(`total buckets ${bucketsCount.total}, actived buckets ${bucketsCount.active}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
