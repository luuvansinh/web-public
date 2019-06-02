import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './configs/locale'

// Load views
import { LayoutView } from './screens/layout'
import { LoginView, LoginModel } from './screens/login'
import { HomeView, HomeModel } from './screens/home'
import { CartModel, CartView } from './screens/cart'
import { ProductDetailModel, ProductDetailView } from './screens/product-detail'
import { CategoryPublicModel, CategoryPublicView } from './public/category'
import { CheckoutModel, CheckoutView } from './screens/checkout'
import { SearchModel, SearchView } from './screens/search'
import { ProfileModel, ProfileView } from './screens/profile'

const { ConnectedRouter } = routerRedux

function Routers({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./screens/error'),
  })
  const unauthenticatedRoutes = [{
    path: '/',
    models: () => [HomeModel],
    component: () => HomeView,
  }, {
    path: '/login',
    models: () => [LoginModel],
    component: () => LoginView,
  }, {
    path: '/products/:productId',
    models: () => [ProductDetailModel],
    component: () => ProductDetailView,
  }]
  // Routes
  const routes = [{
    path: '/',
    models: () => [HomeModel],
    component: () => HomeView,
  }, {
    path: '/login',
    models: () => [LoginModel],
    component: () => LoginView,
  }, {
    path: '/products/:productId',
    models: () => [ProductDetailModel],
    component: () => ProductDetailView,
  }, {
    path: '/cart',
    model: () => [CartModel],
    component: () => CartView,
  }, {
    path: '/categories/:categoryId',
    models: () => [CategoryPublicModel],
    component: () => CategoryPublicView,
  }, {
    path: '/checkout',
    models: () => [CheckoutModel],
    component: () => CheckoutView,
  }, {
    path: '/search',
    models: () => [SearchModel],
    component: () => SearchView,
  }, {
    path: '/profile',
    models: () => [ProfileModel],
    component: () => ProfileView,
  }]
  // const role = localStorage.getItem(AppConst.localStorage.roleKey)
  const unauthenticatedComponents = (
    <Switch>
      {
        unauthenticatedRoutes.map(({ path, ...dynamics }) => (
          <Route
            key={path}
            exact
            path={path}
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))
      }
    </Switch>
  )
  return (
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <LayoutView unauthenticatedComponents={unauthenticatedComponents}>
          <Switch>
            {/* <Route exact path="/" render={() => (<Redirect to={`/${RoleConst[role || 'admin'].pages[0].id}`} />)} /> */}
            {
              routes.map(({ path, ...dynamics }) => (
                <Route
                  key={path}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </LayoutView>
      </ConnectedRouter>
    </I18nextProvider>
  )
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}
export default Routers
