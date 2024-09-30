## Scroll Swap Agent

## Getting Started 🚀

The contract was deployed to scroll sepolia.
On the chat interface, the user's query is judged by the LLM and the information that fits the answer is branched out through the appropriate tool. In this project, we have implemented coin price information, graphs, detailed data analysis, and user's balance, minting, and AMM-based coin swap. For this swap, we used Pyth's price feed to determine the price of the coin swap with oracle price. also used with alchemysdk to get balance for the user address.


1. Create a `.env` file in the project directory (next to `.env.example`) and add the following:

   ```
   OPENAI_API_KEY=                        # Get one at https://platform.openai.com
   POLYGON_API_KEY=                       # Get one at https://polygon.io/
   NEXT_PUBLIC_ALCHEMY_API_KEY=           # Get one at https://alchemy.com/
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the app:
    ```
    npm dev
    ```

## contracts
Base Token deployed at address:  0x66C9E6aAa33347451aEeA79ba5716dDA23E1D26C
Quote Token deployed at address:  0x39Df427D082bd47af93F3d8DED3F2F630d9fCBCA
OracleSwap contract deployed at address:  0x88818cE3F6e39c9E2bBfbDe005e4484838847e92
Pyth network scroll sepolia: 0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c
