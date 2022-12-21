import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { ProjectProvider } from "../context/ProjectContext";
import Projects from "../components/Projects";
import { BrowserRouter } from "react-router-dom";

describe("check component loads correctly", () => {
  beforeEach(() => {
    render(
      <ProjectProvider>
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      </ProjectProvider>
    );
  });

  afterEach(cleanup);

  test("check if projectlist has a list with projects and correct amount", async () => {
    const projectlist = await screen.findAllByTestId("list");
    expect(projectlist).toBeDefined();
    const project = await screen.findAllByTestId("item");
    expect(project).toHaveLength(3);
    expect(project).not.toHaveLength(1);
    const findProject = await screen.getAllByText("onsdag");
    expect(findProject).toHaveLength(1);
  });
});
