import * as Yup from 'yup';

export const calculateAge = (birthdate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

export const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const FormSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .required('Nome é obrigatório')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Digite nome e sobrenome'),

  dataNascimento: Yup.string()
    .required('Data de nascimento é obrigatória')
    .test('data-valida', 'Data inválida', function(value) {
      if (!value) return false;
      const date = new Date(value.split('/').reverse().join('-'));
      return !isNaN(date.getTime());
    }),

  cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('cpf-valido', 'CPF inválido', value => {
      if (!value) return false;
      return validateCPF(value);
    }),

  telefoneFixo: Yup.string()
    .required('Telefone fixo é obrigatório')
    .matches(/^\(\d{2}\) \d{4}-\d{4}$/, 'Formato inválido. Use (XX) XXXX-XXXX'),

  celular: Yup.string()
    .required('Celular é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido. Use (XX) XXXXX-XXXX'),

  nomePai: Yup.string()
    .when('dataNascimento', {
      is: (value: string) => {
        if (!value) return false;
        const date = new Date(value.split('/').reverse().join('-'));
        return calculateAge(date) < 18;
      },
      then: Yup.string().required('Nome do pai é obrigatório para menores de idade'),
      otherwise: Yup.string(),
    }),

  nomeMae: Yup.string()
    .when('dataNascimento', {
      is: (value: string) => {
        if (!value) return false;
        const date = new Date(value.split('/').reverse().join('-'));
        return calculateAge(date) < 18;
      },
      then: Yup.string().required('Nome da mãe é obrigatório para menores de idade'),
      otherwise: Yup.string(),
    }),

  cep: Yup.string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Formato inválido. Use XXXXX-XXX'),

  endereco: Yup.string()
    .required('Endereço é obrigatório'),

  numero: Yup.string()
    .required('Número é obrigatório'),

  complemento: Yup.string(),

  cidade: Yup.string()
    .required('Cidade é obrigatória'),

  estado: Yup.string()
    .required('Estado é obrigatório'),

  email: Yup.string()
    .required('Email é obrigatório')
    .email('Email inválido'),

  senha: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Senha deve conter maiúsculas, minúsculas, números e caracteres especiais'
    ),

  confirmarSenha: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('senha')], 'Senhas não conferem'),
});