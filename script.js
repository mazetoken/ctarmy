document.addEventListener("DOMContentLoaded", async (event) => {
  Object.assign(globalThis, await __mainnetPromise);
  DefaultProvider.servers.testnet = ["wss://chipnet.imaginary.cash:50004"]

  // Test that indexedDB is available
  var db = window.indexedDB.open('test');
  db.onerror = () => alert("Can't use indexedDB, might be because of private window.")
  
  document.getElementById("import").onclick = async () => {
    var seed = $("#importSeedPhrase").val();
    var privatekey = $("#importPrivateKey").val();
    //var wallet = await TestNetWallet.fromSeed(seed, "m/44'/0'/0'/0/0");
    //var wallet = await TestNetWallet.fromWIF(privatekey);
    if (wallet = seed) {
      var wallet = await TestNetWallet.fromSeed(seed, "m/44'/0'/0'/0/0");
    } else if (wallet = privatekey) {
      var wallet = await TestNetWallet.fromWIF(privatekey);
    }
    console.log(wallet);

    Config.EnforceCashTokenReceiptAddresses = true;
    var address = await wallet.getTokenDepositAddress();
    var bchBalance = await wallet.getBalance();
    
    var content = "BCH address: " + "<br>" + address + "<br>" + "BCH balance: " + JSON.stringify(bchBalance);
    $("#echo1").html(content);

    var tokenId = "e4213ae79966b62aa5e1c436b2216fb770a5c2a098f7f6f4b55042773bf794bf";
    var nftTokenBalance = await wallet.getNftTokenBalance(tokenId);
    console.log(nftTokenBalance);

    //var content = "";
    var content = "MTAC NFT token Id: " + "<br>" + tokenId + "<br>" + "NFT balance: " + JSON.stringify(nftTokenBalance);
    $("#echo2").html(content);

    if (nftTokenBalance > 0) {
      var content = "Congratulations. You can enter Cash Tokens Army." + "<br>" + "<br>" + '<button class="btn btn-primary btn-sm" onclick="displayCta()">Enter Cash Tokens Army</button>';
      $("#echo3").html(content);
    } else if (nftTokenBalance === 0) {
      var content = "You can not enter Cash Tokens Army. You need MTAC NFT.";
      $("#echo3").html(content);
    }
  };
  document.getElementById("create").onclick = async () => {
    var wallet = await TestNetWallet.named("mywallet");
    console.log(wallet);
    Config.EnforceCashTokenReceiptAddresses = true;
    var address = await wallet.getTokenDepositAddress();
    var bchBalance = await wallet.getBalance();
    var content = "BCH address: " + "<br>" + address + "<br>" + "BCH balance: " + JSON.stringify(bchBalance) + "<br>" + "Seed phrase: " + wallet.mnemonic + "<br>" + "Private key: " + wallet.privateKeyWif + "<br>" + "<br>" + "Save seed phrase and private key.";
    $("#echo3").html(content);
  }
});

document.getElementById("Cta").style.display = "none";
function displayCta() {
var x = document.getElementById("Cta");
if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}
};