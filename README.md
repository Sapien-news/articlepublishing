# articlepublishing
anchor init articlepublishing

anchor build

solana address -k /Path to program key generated inside target/deploy

replace the key Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS with the program key generated in both lib.rs and anchor.toml

anchor deploy

This program is used to generate PDAs that would be updated by the governance program

You can check out this program in our Dapp demo at https://www.sapien.news/

Devnet deployed
