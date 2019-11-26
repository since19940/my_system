import React, { Component } from 'react'
import screenfull from 'screenfull'
import { withTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { removeItem } from '../../../utils/storage'
import { removeUserSuccess } from '../../../redux/action-creator/user.js'
import { withRouter } from 'react-router-dom'
import menus from '../../../config/menus'
import './index.less'

@withTranslation()
@withRouter
@connect(
    (state) => ({ username: state.user.user.username }), { removeUserSuccess }
)
class HeaderMain extends Component {

    formatDate = date => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = this.addZero(date.getMonth() + 1);
        const day = this.addZero(date.getDate());
        const hours = this.addZero(date.getHours());
        const minutes = this.addZero(date.getMinutes());
        const seconds = this.addZero(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    addZero = number => {
        if (number < 10) return "0" + number;
        return number;
    };

    state = {
        isFullScreen: false,
        date: this.formatDate(Date.now()),
        isEnglish: this.props.i18n.language === "en" ? true : false,
        title: '',
        path: ''

    }

    //切换语言的点击事件,withTranslation()会将i8N的方法传入
    changeLang = () => {
        const isEnglish = !this.state.isEnglish;
        this.setState({
            isEnglish
        });
        //用
        this.props.i18n.changeLanguage(isEnglish ? "en" : "zh")
    }

    logout = () => {
        Modal.confirm({
            title: "您确定要退出吗?",
            onOk: () => {
                //退出登录,清空redux和localStorage
                removeItem('user');
                this.props.removeUserSuccess()
                this.props.history.replace('/login')
            },
            onCancel: () => {

            }
        })
    }

    toggleScreen = () => {
        screenfull.toggle();

    }

    change = () => {//change事件才能实现esc+onClick触发时,图标随着状态的变换而变换
        this.setState({
            isFullScreen: !this.state.isFullScreen
        })

    }

    componentDidMount() {
        screenfull.on('change', this.change);
        this.timer = setInterval(() => {
            this.setState({
                date: this.formatDate(Date.now())
                /* date: dayjs().format("YYYY/MM/DD HH:mm:ss") */
            });
        }, 1000);

    }


    componentWillUnmount() {
        screenfull.off('change', this.change)
        clearInterval(this.timer)

    }


    //根据属性来生成状态
    static getDerivedStateFromProps(nextProps, prevState) {
        //需求:当loaction.pathname变换才更新title,
        const { pathname } = nextProps.location;
        if (pathname === prevState.path) {//如果地址和之前状态地址一致说明是setState,不需要更新
            return prevState
        }
        let title = '';
        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];//拿到数组中的每一个对象
            if (menu.children) {
                const cMenu=menu.children.find((cMenu) => cMenu.path === pathname)
                //如果该对象上有children的,在其children上找对应的对象,将对应对象的pathname对比当前所在的路径地址
                if (cMenu) {//如果找打一致的那个对象
                    //就将找到的这个对象的title名赋值给上面的title
                    title = cMenu.title
                    break;//找到就终止
                }
            } else {
                if (menu.path === pathname) {
                    title = menu.title
                    break;
                }
            }
        }

        return {//要求返回值是一个新的state状态
            pathname,
            title: `layout.leftNav.${title}`
            //最后不要忘记调用一次t函数将数据进行转换
        }
    }

    render() {
        const { isFullScreen, date,title } = this.state
        const { username,t } = this.props;
        return (
            <div className='header-main'>
                <div className='header-main-top'>
                    <Button size={'small'} onClick={this.toggleScreen}><Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} /></Button>
                    <Button size={'small'} className='lang-btn' onClick={this.changeLang}>English</Button>
                    <span>欢迎,{username}</span>
                    <Button type="link" size={'small'} onClick={this.logout}>退出 </Button>
                </div>
                <div className='header-main-bottom'>
                    <h2>{t(title)}</h2>
                    <span>{date}</span>
                </div>
            </div>
        )
    }
}


export default HeaderMain
