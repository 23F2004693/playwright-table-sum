const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [65,66,67,68,69,70,71,72,73,74];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load (important for dynamic content)
    await page.waitForSelector("table");

    // Get all table cell numbers
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a+b, 0);
    console.log(`Seed ${seed} Sum = ${sum}`);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
})();
