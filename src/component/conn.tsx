import { mainnet, type Chain } from "@starknet-react/chains";
import {
  Connector,
  jsonRpcProvider,
  StarknetConfig,
  starkscan,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { SessionPolicies } from "@cartridge/controller";
import { constants } from "starknet";

export const CARTRIDGE_ADDRESS =
  "0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f";
export const LOTTO_ADDRESS =
  "0x013426dc6703de08428b470b92e1d0350894b32eb74fb9efaea69bae31023628";

// Define session policies
const policies: SessionPolicies = {
  contracts: {
    [CARTRIDGE_ADDRESS]: {
      methods: [
        {
          name: "request_random",
          entrypoint: "request_random",
          description: "Request randomness from cartridge vrf",
        },
      ],
    },
    [LOTTO_ADDRESS]: {
      methods: [
        {
          name: "double_spin",
          entrypoint: "double_spin",
          description: "Spin",
        },
      ],
    },
  },
};

const connector = new ControllerConnector({
  policies,
  defaultChainId: constants.StarknetChainId.SN_MAIN,
  chains: [{ rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet" }],
  namespace: "spining",
  slot: "spining",
}) as never as Connector;

const provider = jsonRpcProvider({
  rpc: (_: Chain) => {
    return { nodeUrl: "https://api.cartridge.gg/x/starknet/mainnet" };
  },
});

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      autoConnect
      defaultChainId={mainnet.id}
      chains={[mainnet]}
      provider={provider}
      connectors={[connector]}
      explorer={starkscan}
    >
      {children}
    </StarknetConfig>
  );
}
