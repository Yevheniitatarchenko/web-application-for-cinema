export default async ({ app, store }) => {
  const routerName = [
    'index'
  ]
  app.router.afterEach((to, from) => {
    if (routerName.includes(to.name)) {
      store.commit('filmsSearch/RESET_STATE')
    }
  })
}
