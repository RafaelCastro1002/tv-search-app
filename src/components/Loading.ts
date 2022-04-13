const imageLoading = "/img/loading.gif";

const $ = document.querySelector.bind(document);

export const renderLoading = (container: HTMLElement) => {
  if (!container) return;

  const htmlContent = `
    <div id="loading-component">
      <img src="${imageLoading}" alt="Carregando conteúdo">
    </div>
  `;

  container.innerHTML += htmlContent;
};

export const hiddenLoading = () => {
  const loadingDiv = <HTMLDivElement>$("#loading-component");

  loadingDiv.style.display = "none";
};
