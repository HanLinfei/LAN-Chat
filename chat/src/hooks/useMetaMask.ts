import { ref } from "vue";
import Web3 from "web3";

const walletAddress = ref<string | null>(null);

export function useMetaMask() {
  async function connectWallet() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      walletAddress.value = accounts[0];

      // 生成签名
      const message = "Login to LAN-Chat";
      const signature = await web3.eth.personal.sign(message, accounts[0], "");

      // 发送到后端
      const res = await fetch("http://localhost:3000/auth/wallet-login", {
        method: "POST",
        body: JSON.stringify({ address: accounts[0], signature }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Login Success:", data);

      // 存储钱包地址
      localStorage.setItem("walletAddress", accounts[0]);
    } else {
      alert("请安装 MetaMask 扩展");
    }
  }

  return { walletAddress, connectWallet };
}
