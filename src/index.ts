const isAfterWedding = new URLSearchParams(window.location.search).has("afterWedding");

if (isAfterWedding) {
  document.title = "Мы поженились!";
  import("./components/after-wedding/index");
} else {
  Promise.all([
    import("./components/timer/index"),
    import("./components/form/index"),
    import("./components/invite/index"),
  ]);
}
