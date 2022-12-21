import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("check if navbar components loads correctly", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  test("checks if there is a link in the navbar with name timer", () => {
    const link = screen.findByText("Timer", {
      name: /Timer/i,
    });
    expect(link).toBeDefined();
  });

  test("checks if there is a link in the navbar with name calendar", () => {
    const link = screen.findByText("Calendar", {
      name: /Calendar/i,
    });
    expect(link).toBeDefined();
  });

  test("checks if there is a link in the navbar with name overview", () => {
    const link = screen.findByText("Overview", {
      name: /Overview/i,
    });
    expect(link).toBeDefined();
  });

  test("test if navbar have only 3 links", async () => {
    screen.debug();
    const link = await screen.queryAllByRole("link");
    expect(link.length).toEqual(3);
    expect(link.length).not.toEqual(2);
    expect(link.length).not.toEqual(4);
  });

  test("check if the overview icon shows", async () => {
    const icon = await screen.queryByTestId("PageviewIcon");
    expect(icon).toBeVisible();
  });
});
