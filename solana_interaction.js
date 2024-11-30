const { Connection, Keypair, clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram, Transaction } = require('@solana/web3.js');

// Replace with your private key
const privateKey = new Uint8Array([142,226,149,93,82,116,58,135,175,53,205,56,154,214,69,163,246,110,237,124,112,62,151,36,29,3,59,245,86,236,238,129,137,18,169,172,11,141,19,162,226,186,235,217,39,3,188,209,229,116,187,25,83,35,88,25,175,241,90,20,24,134,160,86]);

// Create Keypair from the private key
const keypair = Keypair.fromSecretKey(privateKey);

// Create a connection to the Solana devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const publicKey = keypair.publicKey;

// Display public key
console.log('Public Key:', publicKey.toBase58());

// Airdrop SOL to the wallet for testing purposes
const airdropSol = async () => {
    console.log('Requesting airdrop...');
    const airdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);
    console.log('Airdrop successful!');
};

// Example of sending SOL to another address (using your own address for testing)
const sendSol = async (toPublicKey) => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports: 0.1 * LAMPORTS_PER_SOL, // Sending 0.1 SOL
        })
    );

    const signature = await connection.sendTransaction(transaction, [keypair]);
    await connection.confirmTransaction(signature);
    console.log(`Successfully sent 0.1 SOL to ${toPublicKey.toBase58()}`);
};

// Run Airdrop
airdropSol();

// Example sending SOL to another address (optional)
// sendSol(publicKey); // Uncomment and replace with a different public key to send SOL

const getBalance = async () => {
    const balance = await connection.getBalance(publicKey);
    console.log('Balance:', balance / LAMPORTS_PER_SOL, 'SOL');
};

getBalance(); // Call this to see your balance