import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch'
import { Blob } from 'node:buffer'

globalThis.Blob = Blob

afterEach(() => {
  cleanup()
})

// Add global fetch mock
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("/movie/1")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: "Doctor Strange",
            time: 115,
            genres: ["Action", "Adventure", "Fantasy"],
          }),
      });
    }

    if (url.includes("/actors")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              name: "Benedict Cumberbatch",
              movies: ["Doctor Strange", "The Imitation Game", "Black Mass"],
            },
            {
              name: "Justin Timberlake",
              movies: ["Trolls", "Friends with Benefits", "The Social Network"],
            },
            {
              name: "Anna Kendrick",
              movies: ["Pitch Perfect", "Into The Wood"],
            },
            {
              name: "Tom Cruise",
              movies: [
                "Jack Reacher: Never Go Back",
                "Mission Impossible 4",
                "War of the Worlds",
              ],
            },
          ]),
      });
    }

    if (url.includes("/directors")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
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
          ]),
      });
    }

    if (url.includes("/movies")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: "Doctor Strange",
            },
            {
              id: 2,
              title: "Trolls",
            },
            {
              id: 3,
              title: "Jack Reacher: Never Go Back",
            },
          ]),
      });
    }

    // Default empty array for unknown requests
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  });
});
