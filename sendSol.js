const web3 =  require("@solana/web3.js");

(async () => {
  // Connect to cluster
  console.log(web3.clusterApiUrl('devnet'))
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );
  // Uncomment the below command to test your connection to your node
  //console.log(await connection.getEpochInfo())

  // Generate a new random public key
  const secretkey = Uint8Array.from([4,141,211,222,196,83,15,186,225,14,235,178,208,60,129,66,100,109,184,177,43,108,204,141,249,255,156,217,179,89,98,126,140,172,25,113,234,250,227,231,101,75,76,156,217,227,190,122,24,210,58,103,224,130,83,98,147,101,82,111,100,103,187,214])
  const from = web3.Keypair.fromSecretKey(secretkey);
  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(airdropSignature);

  // Generate a new random public key
  const to = web3.Keypair.generate();

  // Add transfer instruction to transaction
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: web3.LAMPORTS_PER_SOL / 100,
    }),
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log('SIGNATURE', signature);
})();
