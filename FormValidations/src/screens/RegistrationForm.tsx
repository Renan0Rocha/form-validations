import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import MaskInput from 'react-native-mask-input';
import { Picker } from '@react-native-picker/picker';
import { FormSchema, calculateAge } from '../utils/validations';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const RegistrationForm = () => {
  const [isSenhaVisible, setIsSenhaVisible] = useState(false);
  const [isConfirmarSenhaVisible, setIsConfirmarSenhaVisible] = useState(false);

  const initialValues = {
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    telefoneFixo: '',
    celular: '',
    nomePai: '',
    nomeMae: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: 'SP',
    email: '',
    senha: '',
    confirmarSenha: '',
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log(values);
          // Aqui você pode implementar o envio do formulário
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
          const isUnder18 = values.dataNascimento
            ? calculateAge(new Date(values.dataNascimento.split('/').reverse().join('-'))) < 18
            : false;

          return (
            <View>
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>

              <TextInput
                label="Nome Completo"
                value={values.nomeCompleto}
                onChangeText={handleChange('nomeCompleto')}
                onBlur={handleBlur('nomeCompleto')}
                error={touched.nomeCompleto && !!errors.nomeCompleto}
                style={styles.input}
              />
              {touched.nomeCompleto && errors.nomeCompleto && (
                <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
              )}

              <MaskInput
                value={values.dataNascimento}
                onChangeText={(masked, unmasked) => {
                  setFieldValue('dataNascimento', masked);
                }}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                style={styles.maskedInput}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
              />
              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={styles.errorText}>{errors.dataNascimento}</Text>
              )}

              <MaskInput
                value={values.cpf}
                onChangeText={(masked, unmasked) => {
                  setFieldValue('cpf', masked);
                }}
                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                style={styles.maskedInput}
                placeholder="CPF (XXX.XXX.XXX-XX)"
              />
              {touched.cpf && errors.cpf && (
                <Text style={styles.errorText}>{errors.cpf}</Text>
              )}

              <MaskInput
                value={values.telefoneFixo}
                onChangeText={(masked, unmasked) => {
                  setFieldValue('telefoneFixo', masked);
                }}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                style={styles.maskedInput}
                placeholder="Telefone Fixo ((XX) XXXX-XXXX)"
              />
              {touched.telefoneFixo && errors.telefoneFixo && (
                <Text style={styles.errorText}>{errors.telefoneFixo}</Text>
              )}

              <MaskInput
                value={values.celular}
                onChangeText={(masked, unmasked) => {
                  setFieldValue('celular', masked);
                }}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                style={styles.maskedInput}
                placeholder="Celular ((XX) XXXXX-XXXX)"
              />
              {touched.celular && errors.celular && (
                <Text style={styles.errorText}>{errors.celular}</Text>
              )}

              {isUnder18 && (
                <>
                  <Text style={styles.sectionTitle}>Informações Complementares</Text>

                  <TextInput
                    label="Nome do Pai"
                    value={values.nomePai}
                    onChangeText={handleChange('nomePai')}
                    onBlur={handleBlur('nomePai')}
                    error={touched.nomePai && !!errors.nomePai}
                    style={styles.input}
                  />
                  {touched.nomePai && errors.nomePai && (
                    <Text style={styles.errorText}>{errors.nomePai}</Text>
                  )}

                  <TextInput
                    label="Nome da Mãe"
                    value={values.nomeMae}
                    onChangeText={handleChange('nomeMae')}
                    onBlur={handleBlur('nomeMae')}
                    error={touched.nomeMae && !!errors.nomeMae}
                    style={styles.input}
                  />
                  {touched.nomeMae && errors.nomeMae && (
                    <Text style={styles.errorText}>{errors.nomeMae}</Text>
                  )}
                </>
              )}

              <Text style={styles.sectionTitle}>Endereço</Text>

              <MaskInput
                value={values.cep}
                onChangeText={(masked, unmasked) => {
                  setFieldValue('cep', masked);
                }}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                style={styles.maskedInput}
                placeholder="CEP (XXXXX-XXX)"
              />
              {touched.cep && errors.cep && (
                <Text style={styles.errorText}>{errors.cep}</Text>
              )}

              <TextInput
                label="Endereço"
                value={values.endereco}
                onChangeText={handleChange('endereco')}
                onBlur={handleBlur('endereco')}
                error={touched.endereco && !!errors.endereco}
                style={styles.input}
              />
              {touched.endereco && errors.endereco && (
                <Text style={styles.errorText}>{errors.endereco}</Text>
              )}

              <TextInput
                label="Número"
                value={values.numero}
                onChangeText={handleChange('numero')}
                onBlur={handleBlur('numero')}
                error={touched.numero && !!errors.numero}
                style={styles.input}
              />
              {touched.numero && errors.numero && (
                <Text style={styles.errorText}>{errors.numero}</Text>
              )}

              <TextInput
                label="Complemento (opcional)"
                value={values.complemento}
                onChangeText={handleChange('complemento')}
                onBlur={handleBlur('complemento')}
                style={styles.input}
              />

              <TextInput
                label="Cidade"
                value={values.cidade}
                onChangeText={handleChange('cidade')}
                onBlur={handleBlur('cidade')}
                error={touched.cidade && !!errors.cidade}
                style={styles.input}
              />
              {touched.cidade && errors.cidade && (
                <Text style={styles.errorText}>{errors.cidade}</Text>
              )}

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.estado}
                  onValueChange={(itemValue) => setFieldValue('estado', itemValue)}
                  style={styles.picker}
                >
                  {estados.map((estado) => (
                    <Picker.Item key={estado} label={estado} value={estado} />
                  ))}
                </Picker>
              </View>
              {touched.estado && errors.estado && (
                <Text style={styles.errorText}>{errors.estado}</Text>
              )}

              <Text style={styles.sectionTitle}>Informações da Conta</Text>

              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && !!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label="Senha"
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                error={touched.senha && !!errors.senha}
                secureTextEntry={!isSenhaVisible}
                right={
                  <TextInput.Icon
                    icon={isSenhaVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsSenhaVisible(!isSenhaVisible)}
                  />
                }
                style={styles.input}
              />
              {touched.senha && errors.senha && (
                <Text style={styles.errorText}>{errors.senha}</Text>
              )}

              <TextInput
                label="Confirmar Senha"
                value={values.confirmarSenha}
                onChangeText={handleChange('confirmarSenha')}
                onBlur={handleBlur('confirmarSenha')}
                error={touched.confirmarSenha && !!errors.confirmarSenha}
                secureTextEntry={!isConfirmarSenhaVisible}
                right={
                  <TextInput.Icon
                    icon={isConfirmarSenhaVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsConfirmarSenhaVisible(!isConfirmarSenhaVisible)}
                  />
                }
                style={styles.input}
              />
              {touched.confirmarSenha && errors.confirmarSenha && (
                <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
              >
                Cadastrar
              </Button>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  maskedInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
  },
  picker: {
    height: 56,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default RegistrationForm;