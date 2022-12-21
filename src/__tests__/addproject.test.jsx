import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddProject from "../components/AddProject";
import { ProjectProvider } from "../context/ProjectContext";

//import mock api
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://127.0.0.1:5173/overview", (req, res, ctx) => {
    return res(ctx.json(data));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const props = {
  mockedAdd: vi.fn(),
  projectName: "test",
};

describe("AddProject component loads correctly", () => {
  afterEach(() => {
    props.mockedAdd.mockClear();
  });

  beforeEach(() => {
    render(
      <ProjectProvider>
        <AddProject addProject={props.mockedAdd} />
      </ProjectProvider>
    );
  });

  afterEach(cleanup);

  test("test to add a new project with value test", async () => {
    const btn = screen.queryByText("CREATE A NEW PROJECT");
    userEvent.click(btn);
    const inputField = await screen.queryByText(/Project/i);
    expect(inputField).toBeInTheDocument();
    fireEvent.change(inputField, { target: { value: "test" } });
    const addbtn = await screen.findByText("Add a project");
    userEvent.click(addbtn);
    expect(inputField).toHaveValue("test");
    expect(inputField).not.toHaveValue("");
  });
});
