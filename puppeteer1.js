let puppeteer = require("puppeteer");
let browserStartPromise = puppeteer.launch({    
    headless: false,
    defaultViewport : null,
    args : ["--start-maximized","--disable-notification"]
});
let page, browser, requiredTab;
browserStartPromise
    .then(function(browserObj){
    console.log('Browser opened')
    browser = browserObj;
    let browserTabOpenPromise = browserObj.newPage();
    return browserTabOpenPromise;
    }).then(function(newTab){
        page = newTab;  //for all the work
        console.log("new tab opened");
        let gpageOpenedPromise = newTab.goto('https://google.com/');
        return gpageOpenedPromise
    }).then(function(){
        console.log("google opened");
        let typingPromise = page.type("input[title='Search']","flipkart");
        return typingPromise
    }).then(function(){
        let enterPromise = page.keyboard.press("Enter")
        console.log("typed flipkart in google search and pressing enter");
        return enterPromise
    }).then(function(){
        let waitElment = page.waitForSelector(".LC20lb.DKV0Md",{visible:true});
        return waitElment;
    }).then(function(){
        let pageClick = page.click(".LC20lb.DKV0Md");
        return pageClick;
    }).then(function(){
        let waitElment = page.waitForSelector("._2QfC02",{visible:true});
        return waitElment;
    }).then(function(){
        let pageClick = page.click("._2KpZ6l._2doB4z")
        return pageClick;
    }).then(function(){
        let pageSearch = page.type("input[title='Search for products, brands and more']","laptops");
        return pageSearch;
    }).then(function(){
        console.log("searched laptops on flipkart")
        let searched = page.keyboard.press("Enter");
        return searched;
    }).then(function(){
        let waitElment = page.waitForSelector("div._4rR01T",{visible:true});
        return waitElment;
    }).then(function(){
        let pageClick = page.click("div._4rR01T")
        return pageClick;
    }).then(function(){
        //next tab will take some time to open
        let waitPromise = page.waitFor(2000);
        // can also use the following
        // let waitPromise = Date.now + 2000;
        // while(waitPromise< Date.now()){};
        return waitPromise;

    }).then(function(){
        // selecting all tab 
        let listOfTabs = browser.pages();
        return listOfTabs;
    }).then(function(arr){
        // selecting latest tab open
        requiredTab =arr[arr.length - 1];
        let waitElem = requiredTab.waitForSelector("button[class='_2KpZ6l _2U9uOA ihZ75k _3AWRsL']", {visible:true});
        return waitElem;
    }).then(function(){
        console.log("opening cart");
        let lastCall = requiredTab.click("button[class='_2KpZ6l _2U9uOA ihZ75k _3AWRsL']");
        return lastCall;
    }).then(function(){
        console.log("finished")
    })

