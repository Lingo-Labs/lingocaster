use anchor_lang::prelude::*;

declare_id!("9zRMVhjyPgwyshLT1dBpc7D6unYWbGVFfyanzAGGnxJ4");

#[program]
pub mod programs {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
