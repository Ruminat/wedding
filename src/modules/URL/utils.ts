export function getUrlParameters() {
  const params = new URLSearchParams(window.location.search);

  const param = (name: string) => params.get(name) ?? undefined;

  const scriptURL = param("scriptURL") || import.meta.env.VITE_FORM_HANDLE;

  return {
    who: param("who"),
    plural: param("plural") !== undefined,
    fool: param("fool") !== undefined,
    scriptURL: scriptURL ?? "fake",
  };
}
