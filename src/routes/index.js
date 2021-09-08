import Login from '../pages/Login'
import UserManage from '../pages/UserManage'
import TrainManage from '../pages/TrainManage'
import SetManage from '../pages/SetManage'
import BuyQuery from '../pages/BuyQuery'
import SaleQuery from '../pages/SaleQuery'
import NotFound from '../pages/NotFound'

export const indexRoutes = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const mainRoutes = [{
    pathname: '/admin/userManage',
    component: UserManage,
    title: '用户管理',
    icon: 'user',
    isNav: true,
}, {
    pathname: '/admin/trainManage',
    component: TrainManage,
    title: '车次管理',
    icon: 'user',
    isNav: true,
}, {
    pathname: '/admin/setManage',
    component: SetManage,
    title: '座位管理',
    icon: 'user',
    isNav: true,
}, {
    pathname: '/admin/buyQuery',
    component: BuyQuery,
    title: '订单查询',
    icon: 'user',
    isNav: true,
}, {
    pathname: '/admin/saleQuery',
    component: SaleQuery,
    title: '销售查询',
    icon: 'user',
    isNav: true,
}]

