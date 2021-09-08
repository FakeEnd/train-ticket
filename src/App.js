import React, {useEffect} from 'react'
import Axios from 'axios';

import 'antd/dist/antd.css';
import { Layout, Menu } from "antd";

import { Route, Switch, Redirect } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { mainRoutes } from './routes'

import { useSelector } from 'react-redux'

const { Header, Content, Footer } = Layout;

export default function App() {

    let his = useHistory()
    let loc = useLocation()

    let isLogin = useSelector(state => state.Login.isLogin)
    let token = useSelector(state => state.Login.token)
    useEffect(() => {
        //未登录状态访问除登录、注册、管理员登录页面以外的页面，均跳转到登录页面进行登录
        console.log(isLogin,token)
    }, [isLogin, token])

    Axios.defaults.headers['token'] = token;
    
    return (
        isLogin
        ?
        <Layout className="layout" style={{ minHeight: '100%' }} >
            <Header style={{ height: '45px', padding: '0px 10px' }} >
                <Menu
                    style={{ lineHeight: '45px' }}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => his.push(key)}
                    selectedKeys={[loc.pathname]}
                >
                    {
                        mainRoutes.map(route => {
                            return <Menu.Item key={route.pathname}>{route.title}</Menu.Item>
                        })
                    }
                </Menu>
            </Header>
            <Content style={{ padding: '10px 10px 0px', margin: '0px ', height: '100%' }}>
                <div style={{ background: '#fff', padding: "10px 10px", minHeight: '100%' }}>
                    <Switch>
                        {
                            mainRoutes.map(route => {
                                return <Route key={route.pathname} path={route.pathname} component={route.component} />
                            })
                        }
                        <Redirect to={mainRoutes[0].pathname} from='/admin' exact />
                        <Redirect to='/userManage' from='/' exact />
                    </Switch>
                </div>
                <Footer style={{ padding: "20px 0px 0px", textAlign: "center" }}>
                    <p>山东大学 ©2021 19级5班 郭常瑞</p>
                </Footer>
            </Content>

        </Layout>
        :
        <Redirect to="/login" />
    )
}
