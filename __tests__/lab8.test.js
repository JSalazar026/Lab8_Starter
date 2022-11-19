describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://cse110-f2021.github.io/Lab8_Website');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    const prodItems = await page.$$('product-item');
    for (let item = 1; item < 20; item++)
    {
      let data, plainValue;
      // Query select all of the <product-item> elements
      console.log(`Checking product item ${item}/${prodItems.length}`);
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[item].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      // TODO - Step 1
      // Right now this function is only checking the first <product-item> it found, make it so that
      // it checks every <product-item> it found
    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const prodItem = await page.$('product-item');
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    let shadow = await prodItem.getProperty('shadowRoot');
    let shadowButton = await shadow.$('button');
    // Once you have the button, you can click it and check the innerText property of the button.
    await shadowButton.click();
    let shadowButtonText = await shadowButton.getProperty('innerText');
    let value = await shadowButtonText.jsonValue();
    // Once you have the innerText property, use innerText['_remoteObject'].value to get the text value of it
    expect(value).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    const prodItems = await page.$$('product-item');
    for(let item = 1; item < 20; item++) {
      const shadow = await prodItems[item].getProperty('shadowRoot');
      let shadowButton = await shadow.$('button');
      await shadowButton.click();
    }
    // Check to see if the innerText of #cart-count is 20
    let cartCount = await page.$('#cart-count');
    let cartCountText = await cartCount.getProperty('innerText');
    let count = await cartCountText.jsonValue();
    expect(count).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.reload();
    const prodItems = await page.$$('product-item');
    // element to make sure that all of their buttons say "Remove from Cart".
    for(let item = 0; item < 20; item++) {
      const shadow = await prodItems[item].getProperty('shadowRoot');
      let shadowButton = await shadow.$('button');
      let shadowButtonText = await shadowButton.getProperty('innerText');
      let value = await shadowButtonText.jsonValue();
      expect(value).toBe('Remove from Cart');
    }
    // Also check to make sure that #cart-count is still 20
    let cartCount = await page.$("#cart-count");
    let cartCountText = await cartCount.getProperty('innerText');
    let count = await cartCountText.jsonValue();
    expect(count).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point the item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    let cart = await page.evaluate(function () {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    const prodItems = await page.$$('product-item');
    for(let item = 0; item < 20; item++) {
      const shadow = await prodItems[item].getProperty('shadowRoot');
      let shadowButton = await shadow.$('button');
      await shadowButton.click();
    }
    // Once you have, check to make sure that #cart-count is now 0
    let cartCount = await page.$("#cart-count");
    let cartCountText = await cartCount.getProperty('innerText');
    let count = await cartCountText.jsonValue();
    expect(count).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    await page.reload();
    const prodItems = await page.$$('product-item');
    for(let item = 0; item < 20; item++) {
      const shadow = await prodItems[item].getProperty('shadowRoot');
      let shadowButton = await shadow.$('button');
      let shadowButtonText = await shadowButton.getProperty('innerText');
      let value = await shadowButtonText.jsonValue();
      expect(value).toBe('Add to Cart');
    }
    // Also check to make sure that #cart-count is still 0
    let cartCount = await page.$("#cart-count");
    let cartCountText = await cartCount.getProperty('innerText');
    let count = await cartCountText.jsonValue();
    expect(count).toBe("0");
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point the item 'cart' in localStorage should be '[]', check to make sure it is
    let cart = await page.evaluate(function () {
      return localStorage.getItem('cart')
    });
    expect(cart).toBe('[]');
  });
});