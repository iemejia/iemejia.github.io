// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Pages we want to verify the top navigation bar works from.
 * Each page should expose the same set of menu links and they should all
 * navigate to the expected target URL.
 */
const SOURCE_PAGES = ['/', '/about/', '/blog/'];

/**
 * Expected menu items: visible label -> target pathname (after navigation).
 */
const EXPECTED_MENU = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'About', path: '/about/' },
];

for (const fromPage of SOURCE_PAGES) {
  test.describe(`Top navigation from ${fromPage}`, () => {
    test(`renders all expected menu links`, async ({ page }) => {
      await page.goto(fromPage);
      const navLinks = page.locator('nav ul li a');
      await expect(navLinks).toHaveCount(EXPECTED_MENU.length);
      for (const item of EXPECTED_MENU) {
        await expect(
          page.locator('nav ul li a', { hasText: new RegExp(`^${item.label}$`) })
        ).toBeVisible();
      }
    });

    for (const item of EXPECTED_MENU) {
      test(`clicking "${item.label}" navigates to ${item.path}`, async ({ page, baseURL }) => {
        await page.goto(fromPage);

        // Ensure the nav is interactive (mobile collapses it behind a toggle)
        const pull = page.locator('#pull');
        if (await pull.isVisible()) {
          await pull.click();
        }

        const link = page.locator('nav ul li a', {
          hasText: new RegExp(`^${item.label}$`),
        });
        await expect(link).toBeVisible();

        await expect
          .poll(async () => {
            const locator = page.locator('header > nav ul li a', {
              hasText: new RegExp(`^${item.label}$`),
            });
            return locator.evaluate((element) => {
              const rect = element.getBoundingClientRect();
              const topElement = document.elementFromPoint(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
              );
              return topElement === element;
            });
          }, { message: `${item.label} should be the top hit target on ${fromPage}` })
          .toBe(true);

        if (test.info().project.name === 'desktop') {
          await link.hover();
          await expect(link).toHaveCSS('cursor', 'pointer');
        }

        // The link should actually point at the expected URL (no broken hrefs)
        const href = await link.getAttribute('href');
        expect(href, `${item.label} href on ${fromPage}`).not.toBeNull();
        const resolved = new URL(href ?? '', `${baseURL}${fromPage}`);
        expect(resolved.pathname).toBe(item.path);

        // Clicking it should actually navigate (catches JS preventDefault bugs)
        await Promise.all([
          page.waitForURL((url) => url.pathname === item.path, { timeout: 5000 }),
          link.click(),
        ]);
        expect(new URL(page.url()).pathname).toBe(item.path);
      });
    }
  });
}
