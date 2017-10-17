import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavLink extends Link {
    render() {
        let isActive = this.context.router.route.location.pathname === this.props.to;
        let className = isActive ? 'active' : '';

        return(
            <li className={className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}


class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar" data-color="purple" data-image="sidebar.jpg">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="http://alexanderkiskin.pro" className="simple-text">
                        БИТ.СТРОИТЕЛЬСТВО 365
                    </a>
                </div>

                <ul className="nav">

                    <NavLink to="/">
                        <i className="pe-7s-home"></i>
                        <p>Приложения</p>
                    </NavLink>

                    <NavLink to="/profile">
                        <i className="pe-7s-id"></i>
                        <p>Реквизиты компании</p>
                    </NavLink>
                    
                    <NavLink to="/tariffs">
                        <i className="pe-7s-edit"></i>
                        <p>Настройки тарифов</p>
                    </NavLink>

                    <NavLink to="/users">
                        <i className="pe-7s-users"></i>
                        <p>Пользователи</p>
                    </NavLink>

                    <NavLink to="/finance">
                        <i className="pe-7s-cash"></i>
                        <p>Финансы</p>
                    </NavLink>

                    <li className="active-pro">
                        <p>По вопросам обращайтесь на support@bit-stroitelstvo.ru или по телефону +7 (495) 134-1538</p>
                    </li>

                </ul>


            </div>
        </div>

    );
  }
}

export default Sidebar;
