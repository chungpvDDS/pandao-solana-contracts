import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Hackathon } from "../target/types/hackathon";

describe("hackathon", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Hackathon as Program<Hackathon>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
