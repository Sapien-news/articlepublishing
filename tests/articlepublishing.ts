import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Connection, Transaction } from "@solana/web3.js";
const { SystemProgram } = anchor.web3;
import { Articlepublishing } from '../target/types/articlepublishing';
import { serializeInstructionToBase64 } from '@solana/spl-governance'
import * as bufferer from '@solana/buffer-layout';

const provider = anchor.Provider.env();
let programAuthority;
let programAuthorityBump;

// Configure the client to use the local cluster.
anchor.setProvider(provider);


export const NODE_RPC = "https://api.devnet.solana.com"; // devnet environment
export const CONNECTION = new Connection(NODE_RPC);

  it('Is initialized!', async () => {
    // Add your test here.
    const idl = JSON.parse(require('fs').readFileSync('/Users/abhinavsharma/sn/SapienPayout/articlepublishing/target/idl/articlepublishing.json', 'utf8'));

    const programId = new anchor.web3.PublicKey('F8nQoxzzpdxyZy9EcK8yoPiEZHjYdixWhPUe4xaVwoHd');
    console.log(programId);

    // Generate the program client from IDL.
    const program = new anchor.Program(idl, programId);

    // Address of the deployed program.

    const Acc1 = anchor.web3.Keypair.generate();
    const Acc2 = anchor.web3.Keypair.generate();

    const confirmation = await CONNECTION.requestAirdrop(
      Acc1.publicKey,
      1000000000
    );
  

    console.log(provider);


    console.log(idl);

    console.log("ma", Acc1.publicKey);
    console.log("providerAccount :", provider.wallet.publicKey);
    console.log("Account :", SystemProgram.programId);


     const [_programAuthority, _programAuthorityBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Acc1.publicKey.toBuffer()], 
      program.programId
    );

    programAuthority = _programAuthority;
    programAuthorityBump = _programAuthorityBump;

    console.log("XYZ - ",programAuthority);

    const instruction = await program.instruction.initialize(
      programAuthorityBump,
      {
        accounts: {
          publisherAccount: programAuthority,
          author: Acc1.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    )

    let serialized = serializeInstructionToBase64(instruction);
    console.log("Account :", serialized);

    const instruction2 = await program.instruction.publishArticle(
        "Checkthis",  Acc2.publicKey,
      {
        accounts: {
          publisherAccount: programAuthority,
          author: Acc1.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    )

    let serialized2 = serializeInstructionToBase64(instruction2);


    console.log("Account 2222222:", serialized2);
/*     const tx1 = await program.rpc.publishArticle("Avadakedavra", {
      accounts: {
        blogAccount: myAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    const account = await program.account.blogAccount.fetch(myAccount.publicKey);
    console.log("Account :", account.latestPost.toString()); */

    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    //const account = await prog.account.myAccount.fetch(myAccount.publicKey);
    //console.log("Account :", account, provider.wallet.publicKey);

    // Check it's state was initialized.
   // assert.ok(account.data == "hi".toString());
   // assert.ok(account.amount.eq(new anchor.BN(1420)));


    // Store the account for the next test.

  //const program = anchor.workspace.Blogger as Program<Blogger>;

    // Add your test here.

//    console.log("Your transaction signature", tx);
  //  console.log("Your transaction2222 signature", tx1);

  });

