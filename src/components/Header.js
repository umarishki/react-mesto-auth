import logoMesto from '../images/logo-mesto.svg';

function App() {
    return (
        <header className="header">
            <img className="header__image" src={logoMesto} alt="Лого: Mesto" />
        </header>
    );
}

export default App;