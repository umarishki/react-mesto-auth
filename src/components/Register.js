import { Link } from 'react-router-dom';
import Form from './Form';

function Register({ handleRegister }) {

    const handleSubmitForm = (e, formValues, setFormValues) => {
        e.preventDefault();
        const { password, email } = formValues;
        if (!password || !email){
            return;
        }
        handleRegister(formValues)
        .then(() => {
            setFormValues({ password: '', email: '' });
        })
        .catch((err) => console.log(err));;
    };

    return (
        <section className="register">
            <Form
                title={'Регистрация'}
                buttonTitle={'Зарегистрироваться'}
                handleSubmitForm={handleSubmitForm}
            />
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </section>
    )
}

export default Register;