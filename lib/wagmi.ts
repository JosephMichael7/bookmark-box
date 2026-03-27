import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";

export const BASE_BUILDER_CODE = "bc_dpijm3su";
export const BASE_DATA_SUFFIX =
  "0x62635f6470696a6d3373750b0080218021802180218021802180218021" as const;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
  dataSuffix: {
    value: BASE_DATA_SUFFIX,
    required: false,
  },
  ssr: true,
});
