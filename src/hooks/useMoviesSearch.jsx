import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from './services/api';
import { useSearchParams } from "react-router-dom";

export function useMoviesSearch() {
    
}