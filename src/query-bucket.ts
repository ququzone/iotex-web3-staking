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
    const printBucket = (bucket: any) => {
        console.log(`
        {
            index: ${bucket.index},
            candidate: ${bucket.candidateAddress},
            stakedAmount: ${bucket.stakedAmount},
            stakedDuration: ${bucket.stakedDuration},
            createTime: ${bucket.createTime},
            stakeStartTime: ${bucket.stakeStartTime},
            unstakeStartTime: ${bucket.unstakeStartTime},
            autoStake: ${bucket.autoStake},
            owner: ${bucket.owner}
        }`)
    }

    console.log(`Query first five buckets...`)
    let buckets = await staking.buckets(0, 5)
    for (let i = 0; i < buckets.length; i++) {
        printBucket(buckets[i])
    }

    const voter = "0x2b7C5CC4dC19744380C306dA66C2826c5DA3630b"
    console.log(`Query voter ${voter} buckets...`)
    buckets = await staking.bucketsByVoter(voter, 0, 5) 
    for (let i = 0; i < buckets.length; i++) {
        printBucket(buckets[i])
    }

    // const candidates = await staking.candidates(0, 5)
    // for (let i = 0; i < candidates.length; i++) {
    //     console.log(candidates[i].name)
    // }

    const candidate = "robotbp00001"
    console.log(`Query candidate ${candidate} buckets...`)
    buckets = await staking.bucketsByCandidate(candidate, 0, 5) 
    for (let i = 0; i < buckets.length; i++) {
        printBucket(buckets[i])
    }

    console.log(`Query buckets by [1,2,3] indexes`)
    buckets = await staking.bucketsByIndexes([1, 2, 3]) 
    for (let i = 0; i < buckets.length; i++) {
        printBucket(buckets[i])
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
