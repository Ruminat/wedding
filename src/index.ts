const isAfterWedding = document.documentElement.classList.contains("after-wedding-mode");

if (isAfterWedding) {
  import("./components/after-wedding/index");
} else {
  Promise.all([
    import("./components/timer/index"),
    import("./components/form/index"),
    import("./components/invite/index"),
  ]);
}
