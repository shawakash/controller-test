import { useAccount, useExplorer } from "@starknet-react/core";
import { useCallback, useState } from "react";
import { CARTRIDGE_ADDRESS, LOTTO_ADDRESS } from "./conn";
import { CallData } from "starknet";

export const ExecuteTxn = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { account } = useAccount();
  const explorer = useExplorer();
  const [txnHash, setTxnHash] = useState<string>();

  const execute = useCallback(async () => {
    if (!account) return;
    setSubmitted(true);
    setTxnHash(undefined);
    try {
      const result = await account.execute([
        {
          contractAddress: CARTRIDGE_ADDRESS,
          entrypoint: "request_random",
          calldata: CallData.compile({
            caller: LOTTO_ADDRESS,
            // Using Source::Nonce(address)
            source: { type: 0, address: account.address },
            // Using Source::Salt(felt252)
            // source: {type: 1, salt: 0x123}
          }),
        },
        {
          contractAddress: LOTTO_ADDRESS,
          entrypoint: "double_spin",
          calldata: [],
        },
      ]);
      setTxnHash(result.transaction_hash);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitted(false);
    }
  }, [account]);

  if (!account) return null;

  return (
    <div>
      <h2>Transfer ETH</h2>
      <button onClick={() => execute()} disabled={submitted}>
        Double Spin
      </button>
      {txnHash && (
        <p>
          Transaction hash:{" "}
          <a
            href={explorer.transaction(txnHash)}
            target="blank"
            rel="noreferrer"
          >
            {txnHash}
          </a>
        </p>
      )}
    </div>
  );
};
