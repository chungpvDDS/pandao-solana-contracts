import { BN, Program, web3 } from "@project-serum/anchor"
import { Hackathon } from "../../target/types/hackathon"
import { systemProgram } from "./common"

export async function initializeTransaction(
	hackathonProgram: Program<Hackathon>,
	walletPublicKey: web3.PublicKey,
	transaction: web3.Transaction = new web3.Transaction()
): Promise<web3.Transaction> {
	const dao = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("dao"), walletPublicKey.toBuffer()],
		hackathonProgram.programId
	)[0]

	transaction.add(
		await hackathonProgram.methods
			.initialize()
			.accounts({
				authority: walletPublicKey,
				dao,
				systemProgram,
			})
			.instruction()
	)

	return transaction
}

export async function grantAdminTransaction(
	hackathonProgram: Program<Hackathon>,
	walletPublicKey: web3.PublicKey,
	admin: web3.PublicKey,
	transaction: web3.Transaction = new web3.Transaction()
): Promise<web3.Transaction> {
	const dao = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("dao"), walletPublicKey.toBuffer()],
		hackathonProgram.programId
	)[0]

	transaction.add(
		await hackathonProgram.methods
			.grantAdmin()
			.accounts({
				authority: walletPublicKey,
				dao,
				account: admin,
			})
			.instruction()
	)

	return transaction
}

export async function revokeAdminTransaction(
	hackathonProgram: Program<Hackathon>,
	walletPublicKey: web3.PublicKey,
	admin: web3.PublicKey,
	transaction: web3.Transaction = new web3.Transaction()
): Promise<web3.Transaction> {
	const dao = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("dao"), walletPublicKey.toBuffer()],
		hackathonProgram.programId
	)[0]

	transaction.add(
		await hackathonProgram.methods
			.revokeAdmin()
			.accounts({
				authority: walletPublicKey,
				dao,
				account: admin,
			})
			.instruction()
	)

	return transaction
}

export async function createProposal(
	hackathonProgram: Program<Hackathon>,
	superAdmin: web3.PublicKey,
	walletPublicKey: web3.PublicKey,
	tokenVote: web3.PublicKey,
	title: string,
	description: string,
	startTime: BN,
	endTime: BN,
	voteType: number,
	numOfOptions: number,
	tokensPerOption: number,
	threshold: number,
	maxOptionsPerVote: number,
	systemProgram: web3.PublicKey,
	tokenProgram: web3.PublicKey,
	time: web3.PublicKey,
	transaction: web3.Transaction = new web3.Transaction()
): Promise<web3.Transaction> {
	const dao = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("dao"), superAdmin.toBuffer()],
		hackathonProgram.programId
	)[0]

	const proposal = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("proposal"), walletPublicKey.toBuffer(), Buffer.from("0")],
		hackathonProgram.programId
	)[0]

	transaction.add(
		await hackathonProgram.methods
			.createProposal(
				title,
				description,
				startTime,
				endTime,
				voteType,
				numOfOptions,
				tokensPerOption,
				threshold,
				maxOptionsPerVote
			)
			.accounts({
				authority: walletPublicKey,
				dao,
				proposal,
				tokenVote,
				systemProgram,
				tokenProgram,
				time,
			})
			.instruction()
	)

	return transaction
}
