import { z } from "zod";

export const addMovieSchema = z.object({
  userId: z.number("User ID is required").int("User ID must be an integer"),
  tmdbId: z.number("TMDB ID is required").int("TMDB ID must be an integer"),
  title: z.string("Title is required").min(1, "Title is required"),
  overview: z.string("Overview must be a string").optional(),
  posterPath: z.string("Poster path must be a string").optional(),
  originalLanguage: z
    .string("Original language must be a string")
    .max(10, "Original language is too long")
    .optional(),
  voteAverage: z.number("Vote average must be a number").optional(),
  status: z.enum(["NOT_WATCHED", "WATCHED"]).default("NOT_WATCHED").optional(),
});

export const updateMovieStatusSchema = z.object({
  status: z.enum(["NOT_WATCHED", "WATCHED"], {
    message: "Status must be either NOT_WATCHED or WATCHED",
  }),
});

export type AddMovieInput = z.infer<typeof addMovieSchema>;
export type UpdateMovieStatusInput = z.infer<typeof updateMovieStatusSchema>;
