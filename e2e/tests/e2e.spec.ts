import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';

test.describe('Twitter Clone E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should load the home page', async ({ page }) => {
    await expect(page.getByTestId('header')).toBeVisible();
    await expect(page.getByTestId('homepage-container')).toBeVisible();
    await expect(page.getByTestId('homepage-title')).toHaveText('Home');
    await expect(page.getByTestId('postlist-container')).toBeVisible();
  });

  test('should create a new post', async ({ page }) => {
    const initialPostItems = await page.getByTestId(/^post-item-/);
    const initialCount = await initialPostItems.count();

    const authorInput = page.getByTestId('createpostform-author-input').locator('input');
    const bodyInput = page.getByTestId('createpostform-body-input').locator('textarea:not([readonly])');

    const author = 'Test Author';
    const body = 'Test post content';

    await authorInput.fill(author);
    await bodyInput.fill(body);
    await page.getByTestId('createpostform-submit-btn').click();

    const updatedPostItems = await page.getByTestId(/^post-item-/);
    const updatedCount = await updatedPostItems.count();
    
    
    await expect(page.getByText(author)).toBeVisible();
    await expect(page.getByText(body)).toBeVisible();

    expect(updatedCount).toBe(initialCount + 1);

  });

  test('should render new post', async ({page}) => {
    await expect(page.getByTestId('postlist-container')).toBeVisible();

    const firstPostItem = page.getByTestId(/^post-item-/).first();
    await expect(firstPostItem.getByTestId(/^post-author-/)).toBeVisible();
    await expect(firstPostItem.getByTestId(/^post-body-/)).toBeVisible();
    await expect(firstPostItem.getByTestId(/^post-created-/)).toBeVisible();
    await expect(firstPostItem.getByTestId(/^post-edit-btn-/)).toBeVisible();
    await expect(firstPostItem.getByTestId(/^post-delete-btn-/)).toBeVisible();

    const postItems = await page.getByTestId(/^post-item-/);
    expect(await postItems.count()).toBeGreaterThan(0);
  })

  test('should edit post ', async ({ page }) => {
    const editButton = page.getByTestId(/^post-edit-btn-/).first();
    await editButton.click();
    await expect(page).toHaveURL(/\/edit\/\d+/);
    await expect(page.getByTestId('editpostpage-container')).toBeVisible();
    await expect(page.getByTestId('editpostpage-title')).toHaveText('Edit Post');
    await expect(page.getByTestId('editpostpage-back-btn')).toBeVisible();
    await expect(page.getByTestId('editpostpage-paper')).toBeVisible();

    // Update the post
    const author = page.getByTestId('editpostform-author-input').locator('input');
    const body = page.getByTestId('editpostform-body-input').locator('textarea:not([readonly])');

    const newAuthor = 'Updated Author';
    const newBody = 'This post has been updated';

    await author.fill(newAuthor);
    await body.fill(newBody)

    await page.getByTestId('editpostform-submit-btn').click();

    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByText(newAuthor)).toBeVisible();
    await expect(page.getByText(newBody)).toBeVisible();
  });

  test('should navigate back from edit page', async ({ page }) => {
    await page.getByTestId('post-edit-btn-1').click();
    await page.getByTestId('editpostpage-back-btn').click();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should delete a post', async ({ page }) => {
    const initialPostCount = await page.getByTestId(/^post-item-/).count();

    await page.getByTestId('post-delete-btn-1').click();

    const newPostCount = await page.getByTestId(/^post-item-/).count();
    expect(newPostCount).toBe(initialPostCount - 1);
  });

  test('should show "Post not found" message for non-existent post', async ({ page }) => {
    await page.goto(`${BASE_URL}/edit/non-existent-post`);
    await expect(page.getByText('Post not found')).toBeVisible();
  });
});