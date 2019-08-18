var rp = require('request-promise');
var proxyPool = require('ip-proxy-pool')
let i =0;
let timeOut= null;
let proxy;
const getProxy = async()=>{
  var options = {
    uri: 'http://www.xiladaili.com/api/?uuid=b8ec6d42c4ff4dbb9d3a4083f5b65b11&num=100&place=中国&protocol=0&sortby=0&repeat=1&format=3&position=1',
  };
  const ret= await rp(options);
  return ret;
}
const  open = async ()=>{
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
  headless: false,
  args:[`--proxy-server=http-dyn.abuyun.com:9020`],
  executablePath:'/Users/chao/Documents/workspace/vsCode/test-ip/node_modules/puppeteer/.local/Chromium.app/Contents/MacOS/Chromium'});
  try {
  const page = await browser.newPage();
  await page.authenticate({
    username: '' ,
    password:''
});
  await page.goto('https://www.952781.com/bbs/forum.php?fromuid=741');
  await page.screenshot({path: 'example1.png'});
  await browser.close();
  }catch(error){
    console.log(error)
    await browser.close();
    return 1;
  }
  await new Promise((res,rej)=>{
    setTimeout(res,parseInt(Math.random()*10+40)*1000)
  })
  return 1;
}
const main = async()=>{
  // let proxys =await getProxy()
  // console.log(proxys);
  for(i =0 ;i<100;i++){
    await open();
  }

  // if(i<100){
  //   setTimeout(main,10000)
  // }else{
  //   return i;
  // }
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


