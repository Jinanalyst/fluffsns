const { Keypair } = require('@solana/web3.js');

// Create the keypair from the private key byte array
const privateKey = new Uint8Array([142,226,149,93,82,116,58,135,175,53,205,56,154,214,69,163,246,110,237,124,112,62,151,36,29,3,59,245,86,236,238,129,137,18,169,172,11,141,19,162,226,186,235,217,39,3,188,209,229,116,187,25,83,35,88,25,175,241,90,20,24,134,160,86]);

const keypair = Keypair.fromSecretKey(privateKey);

// Output the public key and private key
console.log("Public Key: ", keypair.publicKey.toBase58());
console.log("Private Key: ", keypair.secretKey.toString());
