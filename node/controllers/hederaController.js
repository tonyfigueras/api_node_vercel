const { Client, PrivateKey, TokenCreateTransaction, Hbar } = require('@hashgraph/sdk');

// Configura el cliente de Hedera (usa tus credenciales)
const client = Client.forTestnet().setOperator('your-account-id', 'your-private-key');

const createToken = async (req, res) => {
  const { name, symbol, initialSupply } = req.body;

  try {
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId)
      .setAdminKey(PrivateKey.fromString(client.operatorPrivateKey))
      .setFreezeDefault(false)
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    const tokenId = receipt.tokenId;

    res.json({ tokenId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando token en Hedera' });
  }
};


const listTokens = async (req, res) => {
    try {
      // Obtén el ID de la cuenta del usuario autenticado
      const accountId = client.operatorAccountId;
  
      // Ejecuta la consulta de balance para obtener los tokens asociados
      const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
  
      // Extrae los tokens de la respuesta
      const tokens = balance.tokens._map;
  
      const tokenList = Object.keys(tokens).map(tokenId => ({
        tokenId,
        balance: tokens[tokenId].toString()
      }));
  
      res.json({ tokens: tokenList });
    } catch (error) {
      res.status(500).json({ error: 'Error al listar tokens en Hedera' });
    }
  };
  
  module.exports = { createToken, listTokens };
