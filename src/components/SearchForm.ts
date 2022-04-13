import axios from "axios";
import { API_URL } from "../config";
import { getTvShow } from "../models/TVShow";
import { renderLoading, hiddenLoading } from "./Loading";
import renderTVShowCard from "./TVShowCard";

const $ = document.querySelector.bind(document);

const http = axios.create({
  baseURL: API_URL,
});

const searchShows = async (container: HTMLElement) => {
  const params = new URLSearchParams(document.location.search);
  const filter = params.get("filter");

  if (filter) {
    renderLoading(container);
    const response = await http.get("/", {
      params: {
        q: filter,
      },
    });

    hiddenLoading();

    if (response.status == 200) {
      const resultArea = <HTMLDivElement>$("#result-area");
      const { data } = response;
      resultArea.innerHTML = "";
      data.forEach((jsonObj: any) => {
        const { show } = jsonObj;
        const tvShow = getTvShow(show);
        renderTVShowCard(tvShow, resultArea);
      });
    }
  }
};

const renderSearchForm = (container: HTMLElement) => {
  const htmlContent = `
  <form id="search-form">
  <input type="text" id="filter" name="filter" placeholder="Digite o título da série">
  <button>Pesquisar</button>
  </form>
  `;

  container.innerHTML = htmlContent;

  searchShows(container);
};

export default renderSearchForm;
