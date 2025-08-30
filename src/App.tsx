import "./App.css";
import { StarknetProvider } from "./component/conn";
import { ConnectWallet } from "./component/wall-conn";
import { ExecuteTxn } from "./component/txn";

function App() {
  return (
    <>
      <StarknetProvider>
        <ConnectWallet />
        <ExecuteTxn />
      </StarknetProvider>
    </>
  );
}

export default App;
