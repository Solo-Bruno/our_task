import { Stack, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export function ProjectsPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Text size="sm" c="dimmed">Todos tus proyectos</Text>
          <Title order={2} fw={700}>Proyectos</Title>
        </Box>
        <Button leftSection={<IconPlus size={16} />} color="violet">
          Nuevo proyecto
        </Button>
      </Group>

      <Text c="dimmed" size="sm">
        Los proyectos aparecerán aquí una vez conectado el backend.
      </Text>
    </Stack>
  );
}