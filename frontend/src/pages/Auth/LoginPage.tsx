import { useNavigate } from 'react-router-dom';
import {
  Center, Card, Stack, Title, Text,
  TextInput, PasswordInput, Button, Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import type { LoginMutation, LoginMutationVariables } from '../../graphql/generated/graphql';
import { useAuth } from '../../context/AuthContext';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      userId
      email
      name
      rolName
    }
  }
`;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

   const [loginMutation, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
      password: (v) => (v.length >= 6 ? null : 'Mínimo 6 caracteres'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { data } = await loginMutation({
        variables: { input: values },
      });

      if (data?.login) {
        const { accessToken, userId, email, name, rolName } = data.login;

        login(accessToken, { userId, email, name});

        notifications.show({
          title: 'Bienvenido',
          message: `Hola ${name}!`,
          color: 'violet',
        });

        navigate('/dashboard');
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error al iniciar sesión',
        message: error?.message ?? 'Credenciales incorrectas',
        color: 'red',
      });
    }
  };

  return (
    <Center mih="100vh">
      <Card withBorder shadow="sm" radius="md" p="xl" w={380}>
        <Stack gap="lg">
          <Box>
            <Title order={3} fw={800} ta="center" c="violet">
              FlowDesk
            </Title>
            <Text size="sm" c="dimmed" ta="center" mt={4}>
              Accedé a tu espacio de trabajo
            </Text>
          </Box>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="tu@email.com"
                type="email"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Contraseña"
                placeholder="••••••••"
                {...form.getInputProps('password')}
              />
              <Button
                fullWidth
                color="violet"
                loading={loading}
                type="submit"
                mt="xs"
              >
                Ingresar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Center>
  );
}