document.addEventListener("DOMContentLoaded", async (event) => {
  Object.assign(globalThis, await __mainnetPromise);
  DefaultProvider.servers.testnet = ["wss://chipnet.imaginary.cash:50004"]
  
  document.getElementById("importWatchWallet").onclick = async () => {
    var watchWallet = $("#importWalletAddress").val();
    var watchWallet1 = watchWallet.toString();
    const wallet = await TestNetWallet.watchOnly(watchWallet1);
    console.log(wallet);

    var bchBalance = await wallet.getBalance();
    console.log(bchBalance);

    var content = "";
    content += "BCH address: " + "<br>" + wallet + "<br>" + "BCH balance: " + JSON.stringify(bchBalance);
    $("#echo1").html(content);

    var tokenId = "e4213ae79966b62aa5e1c436b2216fb770a5c2a098f7f6f4b55042773bf794bf";
    var nftTokenBalance = await wallet.getNftTokenBalance(tokenId);
    console.log(nftTokenBalance);

    var content = "";
    content += "MTAC NFT token Id: " + "<br>" + tokenId + "<br>" + "NFT balance: " + JSON.stringify(nftTokenBalance);
    $("#echo2").html(content);

    if (nftTokenBalance > 0) {
      var content = "";
      content += "Congratulations. You can enter Cash Tokens Army" + "<br>" + "<br>" + '<button class="btn btn-primary btn-sm" onclick="displayCta()">Enter Cash Tokens Army</button>';
      $("#echo3").html(content);
    } else if (nftTokenBalance = 0) {
      var content = "";
      content += "You can not enter Cash Tokens Army. You need MTAC NFT";
      $("#echo3").html(content);
    }
  };
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