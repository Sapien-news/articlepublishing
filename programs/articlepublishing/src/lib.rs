use anchor_lang::prelude::*;

declare_id!("F8nQoxzzpdxyZy9EcK8yoPiEZHjYdixWhPUe4xaVwoHd");

#[program]
pub mod articlepublishing {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, publisher_account_bump: u8) -> ProgramResult {
        ctx.accounts.publisher_account.bump = publisher_account_bump;
        ctx.accounts.publisher_account.author = *ctx.accounts.author.key;
        Ok(())
    }

    pub fn publish_article(ctx: Context<PublishArticle>, article_uri: String, draft_account: Pubkey) -> ProgramResult {
        let article_acc = &mut ctx.accounts.publisher_account;
        article_acc.articleuri = article_uri;
        article_acc.draftaccount = draft_account;
        article_acc.articlestate = 1;
        Ok(())
    }

    pub fn censor_article(ctx: Context<CensorArticle>, article_uri: String, draft_account: Pubkey) -> ProgramResult {
        let article_acc = &mut ctx.accounts.publisher_account;
        article_acc.articleuri = article_uri;
        article_acc.draftaccount = draft_account;
        article_acc.articlestate = 0;
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(publisher_account_bump: u8)]
pub struct Initialize<'info> {   
#[account(init, seeds = [author.key().as_ref()], bump, payer = author, space = 8+8+566)]
publisher_account: Account<'info, ArticleState>,
#[account(mut)]
author: Signer<'info>,
system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PublishArticle<'info> {
    #[account(mut, has_one=author)]
    publisher_account: Account<'info, ArticleState>,
    author: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CensorArticle<'info> {
    #[account(mut, seeds = [author.key().as_ref()], bump = publisher_account.bump)]
    publisher_account: Account<'info, ArticleState>,
    author: Signer<'info>,
    system_program: Program<'info, System>,
}


#[account]
#[derive(Default)]
pub struct ArticleState {
    articleuri: String,
    draftaccount: Pubkey,
    author: Pubkey,
    articlestate: u8,
    bump: u8,
}