import { getTvShow } from "./models/TVShow";
import axios from "axios";

import renderTVShowDetails from "./components/TVShowDetails";
import { SINGLE_SHOW_API_URL } from "./config";
import "./style.css";
import { hiddenLoading, renderLoading } from "./components/Loading";

const $ = document.querySelector.bind(document);

const searchTVShow = async (id: string) => {
  const container = <HTMLDivElement>$("#container");

  const http = axios.create({
    baseURL: SINGLE_SHOW_API_URL,
  });

  renderLoading(container);
  const response = await http.get(`/${id}`);
  hiddenLoading();

  if (response.status == 200) {
    const { data } = response;
    const tvShow = getTvShow(data);
    renderTVShowDetails(tvShow, container);
  }
};

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (id) {
  searchTVShow(id);
}
