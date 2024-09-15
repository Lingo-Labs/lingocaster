use anchor_lang::prelude::*;

declare_id!("9zRMVhjyPgwyshLT1dBpc7D6unYWbGVFfyanzAGGnxJ4");

#[program]
pub mod betting {
    use super::*;

    pub fn bet(ctx: Context<Bet>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.user_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        ctx.accounts.bet_info.bet_amount = amount;
        ctx.accounts.bet_info.player_one = *ctx.accounts.user_authority.key;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Bet<'info> {
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(signer)]
    pub user_authority: AccountInfo<'info>,
    #[account(mut)]
    pub bet_info: Account<'info, BetInfo>,
    pub token_program: Program<'info, Token>,
}