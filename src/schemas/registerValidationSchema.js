import * as Yup from 'yup';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur.'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur.'),
  firstName: Yup.string().min(2,'Ad en az 2 karakter olmalıdır.').required('Ad zorunludur.'),
  lastName: Yup.string().min(2,'Soyad en az 2 karakter olmalıdır.').required('Soyad zorunludur.'),
  phoneNumber: Yup.string().matches(/^05[1-9][0-9]{8}$/,'Geçerli bir telefon numarası giriniz.').required('Telefon numarası zorunludur.')
});

export default registerValidationSchema;
