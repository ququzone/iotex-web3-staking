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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const printCandidate = (candidate: any) => {
        console.log(`
        {
            ownerAddress: ${candidate.ownerAddress},
            operatorAddress: ${candidate.operatorAddress},
            rewardAddress: ${candidate.rewardAddress},
            name: ${candidate.name},
            totalWeightedVotes: ${candidate.totalWeightedVotes},
            selfStakeBucketIdx: ${candidate.selfStakeBucketIdx},
            selfStakingTokens: ${candidate.selfStakingTokens}
        }`)
    }

    console.log(`Query five candidates...`)
    const candidates = await staking.candidates(0, 5)
    for (let i = 0; i < candidates.length; i++) {
        printCandidate(candidates[i])
    }

    const name = "robotbp00007"
    console.log(`Query candidate ${name} info...`)
    let candidate = await staking.candidateByName(name)
    printCandidate(candidate)

    const address = "0x22A8A691599704A58a2360F7680Ad650d75983dD"
    console.log(`Query candidate info by address ${address} ...`)
    candidate = await staking.candidateByAddress(address)
    printCandidate(candidate)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
