const DOTENV = require('dotenv').config();
const SELENIUM = require('selenium-webdriver');

const URL = process.env.URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const NAMA = process.env.NAMA;
const KELAS = process.env.KELAS;

const JAM = '8:00'.split(':');

const driver = new SELENIUM.Builder().forBrowser('chrome').build();
// We bypassing "This browser or app may not be secure" 
const bypass = async () => {
    try {
        await driver.get('https://stackoverflow.com/users/signup?ssrc=head&returnurl=%2users%2fstory%2fcurrent');
        await driver.findElement(SELENIUM.By.xpath('//*[@id="openid-buttons"]/button[1]')).click();
        await driver.findElement(SELENIUM.By.xpath('//*[@type="email"]')).sendKeys(EMAIL);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="identifierNext"]')).click();
        await sleep(2000);
        await driver.findElement(SELENIUM.By.xpath('//*[@type="password"]')).sendKeys(PASSWORD);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="passwordNext"]')).click();
        await sleep(2000);
        submitForm();
    } catch (error) {
        await driver.quit();
    }
}

// Tambah / edit xpath & value di bawah ini.
const submitForm = async () => {
    try {
        await driver.get(URL);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input')).sendKeys(NAMA);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div[1]/input')).sendKeys(KELAS);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div[1]/div/div[1]/input')).sendKeys(EMAIL);
        await driver.findElement(SELENIUM.By.xpath('//*[@id="i21"]/div[2]')).click();

        let onTime = false;
        while(onTime == false){
            const date = new Date();
            if(date.getHours() == JAM[0] && date.getMinutes() >= JAM[1]){
                await driver.findElement(SELENIUM.By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div/div/span/span')).click();
                console.log('OnTime = true');
                onTime = true;
            }
        }
    } catch (error) {
        await driver.quit();
    }
}

(() => {
    let onTime = false;
    var copyJam = [...JAM];
    if(copyJam[1] == 00) copyJam[1] = 60;
    while(onTime == false){
        const date = new Date();
        if(date.getHours() == copyJam[0] && date.getMinutes() == copyJam[1] - 1){
            bypass();
            console.log('OnTime = true');
            onTime = true;
        }else if(date.getHours() == copyJam[0] && JAM[1] == 0 && date.getMinutes() >= JAM[1]){
            bypass();
            console.log('OnTime = true but late');
            onTime = true;
        }else if(date.getHours() == copyJam[0] && JAM[1] != 0 && date.getMinutes() >= JAM[1]){
            bypass();
            console.log('OnTime = true but late');
            onTime = true;
        }
    }
})();

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 