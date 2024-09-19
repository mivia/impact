import { test, expect, Page } from '@playwright/test';

const APP_URL = 'http://localhost:3000';

const addItemToACart = async (page: Page) => {
  await page.goto(APP_URL);

  const items = await page.locator('data-test-id=e2eProductContainer');

  await items.nth(1).getByText('Add to cart').click();

  await page.goto(`${APP_URL}/cart`);

  const cartItems = await page.locator('data-test-id=e2eCartItem');

  const cartItemsCount = await cartItems.count();

  await expect(cartItemsCount).toEqual(1);
}

test('adding an item to the cart', async ({ page }) => {
  await addItemToACart(page);
});

test('deleting an item from the cart', async ({ page }) => {
  await addItemToACart(page);

  const itemToDelete = await page.locator('data-test-id=e2eCartItem').nth(0);

  await itemToDelete.getByAltText('Trash icon').click();

  const cartItems = await page.locator('data-test-id=e2eCartItem');
  
  const cartItemsCount = await cartItems.count();

  await expect(cartItemsCount).toEqual(0);
});