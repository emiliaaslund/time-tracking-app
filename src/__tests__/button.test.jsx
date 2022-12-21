import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Button from "@mui/material/Button";

const handleClick = vi.fn();

describe("test if material ui button renders correctly", () => {
  test("test if button works when clicked");
  render(<Button onClick={handleClick}>test</Button>);
  const button = screen.queryByText("test");
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick).not.toBeCalledTimes(2);
});
