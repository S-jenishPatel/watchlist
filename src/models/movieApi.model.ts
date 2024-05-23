export interface IMoviesApi {
  listTitle: string;
  url: string;
  params?: {
    list?: string;
    startYear?: string;
    page?: string;
  };
}
export const moviesApiData: IMoviesApi[] = [
  {
    listTitle: "Latest Box Office Hits",
    url: "/titles",
    params: { list: "top_boxoffice_last_weekend_10" },
  },
  {
    listTitle: "Top Rated Movies",
    url: "/titles",
    params: { list: "top_rated_english_250", startYear: "2000" },
  },
  {
    listTitle: "Top Rated Series",
    url: "/titles",
    params: { list: "top_rated_series_250", startYear: "2000" },
  },
  {
    listTitle: "Upcoming Movies",
    url: "/titles/x/upcoming",
  },
  {
    listTitle: "Top Box Office Movies",
    url: "/titles",
    params: { list: "top_boxoffice_200", startYear: "2000" },
  },
  {
    listTitle: "Most Popular Series",
    url: "/titles",
    params: { list: "most_pop_series", startYear: "2000" },
  },
];
