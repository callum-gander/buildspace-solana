const anchor = require("@project-serum/anchor")
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("Starting test...")

  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Firstsolana

  const baseAccount = anchor.web3.Keypair.generate()

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  })
  
  console.log("Your transaction signature", tx)

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('GIF Count:', account.totalGifs.toString());
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

runMain()