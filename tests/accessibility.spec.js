// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog/' },
];

for (const pageInfo of PAGES) {
  test.describe(`Accessibility: ${pageInfo.name}`, () => {
    test('has no automatically detectable WCAG A/AA violations', async ({ page }) => {
      await page.goto(pageInfo.path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('mobile menu has no automatically detectable WCAG A/AA violations when open', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'mobile', 'Mobile menu is only visible in the mobile project');

      await page.goto(pageInfo.path);
      await page.locator('#pull').click();
      await expect(page.locator('#pull')).toHaveAttribute('aria-expanded', 'true');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
