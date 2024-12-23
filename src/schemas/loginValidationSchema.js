import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz.')
        .required('E-posta alanı zorunludur.'),
    password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır.')
        .required('Şifre alanı zorunludur.'),
});

export default loginValidationSchema;