import { Stack, Title, Text, Box } from '@mantine/core';

export function TasksPage() {
  return (
    <Stack gap="xl">
      <Box>
        <Text size="sm" c="dimmed">Tareas asignadas a vos</Text>
        <Title order={2} fw={700}>Mis Tareas</Title>
      </Box>
      <Text c="dimmed" size="sm">
        Tus tareas aparecerán aquí una vez conectado el backend.
      </Text>
    </Stack>
  );
}