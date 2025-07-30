import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

const renderWithRouter = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavBar />
    </MemoryRouter>
  );

test('wraps content in a div with "navbar" class', () => {
  const { container } = renderWithRouter();
  expect(container.querySelector(".navbar")).toBeInTheDocument();
});

test("renders a Home <NavLink>", () => {
  renderWithRouter();
  const link = screen.getByText(/Home/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/");
});

test("renders an Actors <NavLink>", () => {
  renderWithRouter();
  const link = screen.getByText(/Actors/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/actors");
});

test("renders a Directors <NavLink>", () => {
  renderWithRouter();
  const link = screen.getByText(/Directors/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/directors");
});
