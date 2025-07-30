import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../routes";

const directors = [
  {
    name: "Scott Derrickson",
    movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
  },
  {
    name: "Mike Mitchell",
    movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
  },
  {
    name: "Edward Zwick",
    movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
  },
];

beforeEach(() => {
  vi.stubGlobal("fetch", async () =>
    Promise.resolve({
      ok: true,
      json: async () => directors,
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const router = createMemoryRouter(routes, {
  initialEntries: [`/directors`],
  initialIndex: 0,
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={router} />);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders 'Directors Page' inside of a <h1 />", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByRole("heading", { level: 1, name: /Directors Page/i });
  expect(h1).toBeInTheDocument();
});

test("renders each director's name", async () => {
  render(<RouterProvider router={router} />);
  for (const director of directors) {
    expect(await screen.findByText(director.name, { exact: false })).toBeInTheDocument();
  }
});

test("renders a <li /> for each movie", async () => {
  render(<RouterProvider router={router} />);
  for (const director of directors) {
    for (const movie of director.movies) {
      const li = await screen.findByText(movie, { exact: false });
      expect(li).toBeInTheDocument();
      expect(li.tagName).toBe("LI");
    }
  }
});

test("renders the <NavBar /> component", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/directors']
  });
  render(<RouterProvider router={router} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
