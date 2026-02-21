import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../hooks/useGetWatchlist";
import type { RootState } from "../store/store";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Watchlist() {

  const user = useSelector((state:RootState)=>state.auth)
  const token = user.token!
  const [status,setStatus] =useState<"" | "WATCHED" | "NOT_WATCHED">("");
  const { data: watchlist, isLoading,  } = useWatchlist(token,status);
console.log(watchlist)
  return (
   <section className="py-10 bg-background text-foreground transition-colors duration-300">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center w-full">
    <h1 className="text-3xl font-semibold mb-4">My Watchlist</h1>
     <Tabs
          value={status}
          onValueChange={(value) => setStatus(value as typeof status)}
          className="w-full sm:w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="">ALL</TabsTrigger>
            <TabsTrigger value="WATCHED">WATCHED</TabsTrigger>
            <TabsTrigger value="NOT_WATCHED">NOT_WATCHED</TabsTrigger>
          </TabsList>
        </Tabs>
</div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {isLoading
        ? new Array(12).fill(null).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-lg bg-muted animate-pulse"
            />
          ))
        : watchlist && watchlist.data.map((movie: any) => {
          return  <div
              key={movie.id}
              className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
            >
              <MovieCard movie={movie} />
            </div>
})}
    </div>
  </div>
</section>
  );
}