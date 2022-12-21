import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TaskProvider } from "../context/TaskContext";
import AddTask from "../components/AddTask";
import { ProjectProvider } from "../context/ProjectContext";

const mockedAdd = vi.fn();

describe("check component loads correctly", () => {
  beforeEach(() => {
    const addTask = render(
      <TaskProvider>
        <ProjectProvider>
          <AddTask addTask={mockedAdd} />
        </ProjectProvider>
      </TaskProvider>
    );
  });

  afterEach(cleanup);

  test("should render a button with the text add a new task", async () => {
    const addButton = await screen.findByText("Add a new task");
    expect(addButton).toBeDefined();
  });

  test("test so you dont can't add an empty task", async () => {
    const logSpy = vi.spyOn(global.console, "log");
    const btn = screen.getByText(/Add a new task/i);
    await userEvent.click(btn);
    const input = await screen.getByTestId("testInput");
    expect(input).toBeInTheDocument();
    await fireEvent.change(input, { target: { value: "" } });
    const addbtn = await screen.findByText("ADD A TASK");
    await fireEvent.click(addbtn);
    expect(logSpy).toHaveBeenCalledWith(
      "You must enter values for all required fields"
    );
  });

  test("Check if submitbutton in modal works when clicked", async () => {
    const btn = screen.getByText(/Add a new task/i);
    userEvent.click(btn);
    const addbtn = await screen.findByText("ADD A TASK");
    fireEvent.click(addbtn);
    expect(addbtn).not.toBeVisible();
  });

  test("Test if there is a subheading in the modal", async () => {
    const btn = screen.getByText(/Add a new task/i);
    userEvent.click(btn);
    // screen.debug();
    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
  });
});
