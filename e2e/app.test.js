import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  test.slow();
  await page.goto("http://127.0.0.1:5173/");
  await expect(page).toHaveTitle(/Time Tracking App/);
  await page.getByRole("heading", { name: "Seconds: 00:00:00" }).click();
  await page
    .getByRole("heading", { name: "Choose a project to get started" })
    .click();
  await page.getByRole("button", { name: "Project ​" }).click();
  await page.getByRole("option", { name: "Fredag" }).click();
  await page.getByRole("button", { name: "Task ​" }).click();
  await page.getByRole("option", { name: "kaffe" }).click();
  await page.getByRole("heading", { name: "Task: kaffe" }).click();
  await page.getByRole("button", { name: "Start" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Pause" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("link", { name: "Calendar" }).click();
  await page
    .getByRole("heading", { name: "Choose a date to se timestamps" })
    .click();
  await page.getByPlaceholder("mm/dd/yyyy").click();
  await page.getByRole("link", { name: "Overview" }).click();
  await page.getByRole("tab", { name: "Projects" }).click();
  await page.getByRole("heading", { name: "Active Projects:" }).click();
  await page.getByRole("button", { name: "CREATE A NEW PROJECT" }).click();
  await page.getByTestId("Project").click();
  await page.getByTestId("Project").fill("Test");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Add a project" }).click();
  await page.getByRole("button", { name: "Test X" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("tab", { name: "Tasks" }).click();
  await page.getByRole("heading", { name: "Active Tasks:" }).click();
  await page.getByRole("button", { name: "Add a new task" }).click();
  await page.getByTestId("testInput").click();
  await page.waitForTimeout(2000);
  await page.getByTestId("testInput").fill("TestTask");
  await page.getByRole("button", { name: "Project ​" }).click();
  await page.getByRole("option", { name: "Test" }).click();
  await page.getByRole("button", { name: "ADD A TASK" }).click();
  await page.getByText("TestTask").click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("listitem")
    .filter({ hasText: "TestTaskX" })
    .getByRole("button", { name: "X" })
    .click();
  await page.waitForTimeout(2000);
  await page.getByRole("tab", { name: "Projects" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByRole("button", { name: "Test X" })
    .getByTestId("deletebtn")
    .click();
});
