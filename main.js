const puppeteer = require('puppeteer');
const faker = require('faker');
const screenshot = false;

const dataGen = () => {
  const userId = faker.internet.userName();
  const password = faker.internet.password();
  const memword = faker.random.word();
  const phone = faker.phone.phoneNumber();
  return { userId, password, memword, phone };
}

const range = (n) => Array(n).fill(1).map((x, y) => x + y);


async function browse(page) {
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
}


(async () => {
  const browser = await puppeteer.launch();
  for (const i of range(10)) {
    console.log(`#${i}`);
    const page = await browser.newPage();
    await browse(page);
    await page.close();
  }
  await browser.close();
})();
