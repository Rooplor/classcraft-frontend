export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  if (!user && to.path.match(/\/class\/[a-zA-Z0-9]+$/)) {
    return;
  }

  if (user && to.name === "login") {
    return navigateTo("/");
  }

  if (!user && to.path.includes("/reservation/")) {
    return;
  }

  if (!user && to.name !== "login") {
    return navigateTo("/login");
  }
});
