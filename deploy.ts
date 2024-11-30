import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import * as fs from 'fs';
import * as path from 'path';

const network = "http://127.0.0.1:8899"; // Solana test validator address
const connection = new Connection(network, 'confirmed');

// Path to your wallet and program
const wallet = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync(path.resolve(__dirname, './wallet.json')).toString()))
);
const programId = new PublicKey('YOUR_PROGRAM_ID'); // Replace with actual program ID
const programPath = path.resolve(__dirname, './target/deploy/your_program.so'); // Replace with your program path

// Anchor setup
const provider = new Provider(connection, wallet, { preflightCommitment: 'processed' });
const program = new Program(idl, programId, provider);

async function deploy() {
  console.log('Deploying program...');

  const transaction = new Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: programId,
      lamports: 1000,
    })
  );

  const signature = await provider.send(transaction);
  console.log('Transaction signature:', signature);
}

deploy().then(() => console.log('Program deployed successfully!'));