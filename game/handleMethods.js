/**
 * установка прослушки для баттона
 * @param {HTMLelement} $reloadButton 
 */
export const handleClickReloadButton = ($reloadButton) => {
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
}