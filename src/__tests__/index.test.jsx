import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

test('renders the Movie component on route "/movie/:id"', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Doctor Strange",
          time: "2hr 6min",
          // 👇 THIS must match your Movie.jsx structure exactly
          genres: ["Action", "Adventure"]
        }),
    })
  );

  const router = createMemoryRouter(routes, {
    initialEntries: ["/movie/1"],
  });

  render(<RouterProvider router={router} />);

  // Now these should pass:
  expect(await screen.findByText(/Doctor Strange/)).toBeInTheDocument();
  expect(screen.getByText(/2hr 6min/)).toBeInTheDocument();
  expect(screen.getByText("Action")).toBeInTheDocument();
  expect(screen.getByText("Adventure")).toBeInTheDocument();
});