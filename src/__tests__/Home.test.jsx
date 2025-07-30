import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

const router = createMemoryRouter(routes);

test("renders 'Home Page' inside of an <h1 />", () => {
  render(<RouterProvider router={router} />);
  const h1 = screen.getByText(/Home Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("displays a list of movie titles in <h2> tags", async () => {
  render(<RouterProvider router={router} />);
  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBeGreaterThan(2);
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe("Doctor Strange");
});

test("displays links for each associated movie", async () => {
  render(<RouterProvider router={router} />);
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBeGreaterThan(2);

  const url = new URL(linkList[0].href);
  expect(url.pathname).toBe("/movie/1");
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={router} />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
