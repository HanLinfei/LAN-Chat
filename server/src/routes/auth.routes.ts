import express from "express";
import Web3 from "web3";
import jwt from "jsonwebtoken";

const router = express.Router();
const web3 = new Web3();
const JWT_SECRET = "your_jwt_secret"; // ⚠️ 请用环境变量存储

router.post("/wallet-login", async (req, res) => {
  const { address, signature } = req.body;
  const message = "Login to LAN-Chat";

  try {
    // 1️⃣ 解析签名，验证身份
    const signer = web3.eth.accounts.recover(message, signature);
    if (signer.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: "无效签名" });
    }

    // 2️⃣ 生成 JWT 令牌
    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
