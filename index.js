var rp = require('request-promise');
let i =0;
function getRandIP(){
  var ip = []
  for(var i = 0; i<4; i++){
  ip = ip+Math.floor(Math.random()*256)
  if(i<3){
    ip=ip+'.'
  }
  }
  return ip
}

const  open = async ()=>{
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  try {
  const page = await browser.newPage();
  const ip = getRandIP();
  await page.setExtraHTTPHeaders({
    'x-forwarded-for': ip,
    'x-cluster-client-ip': ip,
  });
  await page.goto('https://www.952781.com/bbs/forum.php?fromuid=744');
  await page.screenshot({path: 'example1.png'});
  await browser.close();
  }catch(error){
    console.log(error)
    await browser.close();
    return 1;
  }
  await new Promise((res,rej)=>{
    setTimeout(res,parseInt(Math.random()*5)*1000)
  })
  return 1;
}
const main = async()=>{
  for(i =0 ;i<100;i++){
    await open();
    console.log(i);
  }
}
const test  = async()=>{


//主程序，爬取ip+检查ip
var proxys = await proxyPool.run()
console.log(proxys)
//不爬取，只检查数据库里现有的ip
var check = await proxyPool.check()

//提取所有ip
var ips = proxyPool.ips
//ips接收一个处理函数，然后向这个函数传递两个参数，一个为错误信息，另一个为数据库里的所有ip
ips((err,response)=>{
    console.log(response)
})
}
main().then((test)=>{
console.log(test);
})


