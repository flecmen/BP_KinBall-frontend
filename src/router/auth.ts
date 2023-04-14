import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import { Notify } from 'quasar';
import { role } from 'src/types/dbTypes';


export function checkAuthentication(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (useUserStore().isAuthenticated) {
    next();
  } else {
    Notify.create({
      type: 'negative',
      message: 'You must be logged in to access this page'
    })
    useUserStore().setAfterLoginRoute(to)
    next({ name: 'login' })
  }
}

export function allowRoles(roles: role[], to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (roles.includes(useUserStore().user.role)) {
    next();
  } else {
    Notify.create({
      type: 'negative',
      message: 'You are not allowed to access this page'
    })
    next({ name: 'home' })
  }
}
