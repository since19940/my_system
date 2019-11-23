import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link,withRouter } from 'react-router-dom'

import menus from '../../../config/menus'
import logo from '../../../assets/logo.png'
import './index.less'

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
    state = {
        menus:[]
    }

    createMenus = (menus) => {
        return   menus.map((menu) => {
            if (menu.children) {
             return  <SubMenu
                 key={menu.path}
                 title={
                     <span>
                         <Icon type={menu.icon}/>
                         <span>{menu.title}</span>
                     </span>
                 }
             >
                 {menu.children.map((cMenu) => this.createCMenus(cMenu))}
             </SubMenu>
             } else {
                return  this.createCMenus(menu)
             }
         })
    }


    componentDidMount() {
        this.setState({
            menus:this.createMenus(menus)
        } )
    }

    createCMenus = (menus) => {
        return <Menu.Item key={menus.path}>
        <Link to={menus.path}>
            <Icon type={menus.icon} />
            <span>{menus.title}</span>
        </Link>
    </Menu.Item>
    }

    findOpenKey = (menus, pathname) => {

        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];
            if (menu.children) {
                const cMenum = menu.children.find((cMenu) => cMenu.path === pathname)
                if (cMenum) {
                    return menu.path;
                }
            }
        }
        menus.forEach((menu) => {
           
        })
    }
   

    render() {
        const { pathname } = this.props.location
       const openKey=this.findOpenKey(menus,pathname)
        return (
            <div>
                <div className="layout-logo">
                    <img src={logo} alt="logo" />
                    <h3>后台管理系统</h3>
                </div>
                <Menu theme="dark"
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={[openKey]}
                    mode="inline">
                    { this.state.menus}
                </Menu> 
            </div>
        )
    }
}


export default LeftNav;