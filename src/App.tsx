import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { StarknetProvider } from "./component/conn";
import { ConnectWallet } from "./component/wall-conn";
import { TransferEth } from "./component/tf-eth";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StarknetProvider>
        <ConnectWallet />
        <TransferEth />
      </StarknetProvider>
    </>
  );
}

export default App;
