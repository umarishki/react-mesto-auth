import logoMesto from '../images/logo-mesto.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header({ loggedIn, email, currentRoute, handleLogOut }) {
    const [linkInfo, setLinkInfo] = useState({link: '#', linkText: ''});

    useEffect(() => {
        if (currentRoute === '/sign-in') {
            setLinkInfo({link: '/sign-up', linkText: 'Зарегистрироваться'});
        } else if (currentRoute === '/sign-up') {
            setLinkInfo({link: '/sign-in', linkText: 'Войти'});
        } else {
            setLinkInfo({link: '/', linkText: 'Выйти'});
        }
    }, []);

    return (
        <header className="header">
            <img className="header__image" src={logoMesto} alt="Лого: Mesto" />
            <div className="header__content">
                {loggedIn && <p className="header__email">{email}</p>}
                <Link className="header__link" to={linkInfo.link} onClick={linkInfo.link === '/' ? handleLogOut : null}>{linkInfo.linkText}</Link>
            </div>
        </header>
    );
}

export default Header;