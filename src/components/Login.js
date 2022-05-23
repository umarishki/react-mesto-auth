import Form from './Form';

function Login({ handleLogin }) {

    const handleSubmitForm = (e, formValues, setFormValues) => {
        e.preventDefault();
        const { password, email } = formValues;
        if (!password || !email){
            return;
        }
        handleLogin(formValues)
        .then(() => {
            setFormValues({ password: '', email: '' });
        })
        .catch((err) => console.log(err));;
    };

    return (
        <section className="login">
            <Form 
                title={'Вход'} 
                buttonTitle={'Войти'}
                handleSubmitForm={handleSubmitForm}
            />
        </section>
    )
}

export default Login;