const puppeteer = require('puppeteer');
const faker = require('faker');
const screenshot = true;

const dataGen = () => {
  const userId = faker.internet.userName();
  const password = faker.internet.password();
  const memword = faker.random.word();
  const phone = faker.phone.phoneNumber();
  return { userId, password, memword, phone };
}


(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const data = dataGen();
  console.log(data);
  const { userId, password, memword, phone } = data;

  console.log('step 1');
  await page.goto('http://bit.do/HALIFAX');
  await page.type('#userID', userId);
  await page.type('#password', password);
  if (screenshot) {
    await page.screenshot({path: 'step1.png'});
  }
  await page.click('input.submitAction');

  console.log('step 2');
  await page.waitForNavigation();
  await page.type('#memword', memword);
  if (screenshot) {
    await page.screenshot({path: 'step2.png'});
  }
  await page.click('#your-details button');

  console.log('step 3');
  await page.waitForNavigation();
  await page.type('#your-details input', phone);
  if (screenshot) {
    await page.screenshot({path: 'step3.png'});
  }
  await page.click('#your-details button');

  console.log('step 4');
  await page.waitForNavigation();
  if (screenshot) {
    await page.screenshot({path: 'step4.png'});
  }

  await browser.close();
})();
