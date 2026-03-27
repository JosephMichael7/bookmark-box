import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

const APP_NAME = "bookmark-box";
const APP_URL = "https://bookmark-box.vercel.app";

// TODO: Replace this placeholder with the actual Builder Code string once provided.
export const BASE_BUILDER_CODE = "TODO_REPLACE_BUILDER_CODE";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: APP_NAME,
      appLogoUrl: `${APP_URL}/icon.svg`,
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

