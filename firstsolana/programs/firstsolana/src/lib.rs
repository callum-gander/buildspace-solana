use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLn");

#[program]
pub mod firstsolana {
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
        // Get reference to account
        let base_account = &mut ctx.accounts.base_account;
        // Initialise total amount of gifs
        base_account.total_gifs = 0;

        Ok(())
    }
}

// Attach certain variables to start stuff's context
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
// Tell Solana what we want it to store on this account
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}
