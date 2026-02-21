import { useState } from "react";
import MovieCard from "../components/MovieCard";

import { Skeleton } from "../components/ui/skeleton";
import { useGetMovies } from "../hooks/useGetMovies";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { MovieSidebar } from "../components/MovieSidebar";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetMovies(page);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
    setSidebarOpen(true);
  };
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Page Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Featured Movies
          </h1>
          <p className="text-muted-foreground text-sm">
            Discover what people are watching right now.
          </p>
        </div>

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-500">
            Failed to load movies.
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-6 gap-y-10">
          {isLoading
            ? new Array(12).fill(null).map((_, i) => (
                <Skeleton key={i} className="aspect-2/3 rounded-xl" />
              ))
            : data && data.map((movie: any) => (
              <div
          onClick={()=>handleMovieClick(movie)}
              key={movie.id}
              className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
            > <MovieCard  movie={movie} /></div>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center pt-4">
         <Pagination>
    <PaginationContent>

      {/* Previous */}
      <PaginationItem>
        <PaginationPrevious
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) setPage(page - 1);
          }}
          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>

      {/* Page Numbers */}
      {[page - 1, page, page + 1].map((p) => {
        if (p <= 0) return null;

        return (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                setPage(p);
              }}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      {/* Next */}
      <PaginationItem>
        <PaginationNext
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
          className="cursor-pointer"
        />
      </PaginationItem>

    </PaginationContent>
  </Pagination>
        </div>
         <MovieSidebar  
                  movie={selectedMovie}
                  open={sidebarOpen}
                  onOpenChange={setSidebarOpen}
                />
      </div>
    </section>
  );
}