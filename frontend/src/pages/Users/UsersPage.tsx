import { Stack, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';

export function UsersPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Text size="sm" c="dimmed">Gestión de usuarios</Text>
          <Title order={2} fw={700}>Usuarios</Title>
        </Box>
        <Button leftSection={<IconUserPlus size={16} />} color="violet">
          Invitar usuario
        </Button>
      </Group>
      <Text c="dimmed" size="sm">
        Los usuarios del sistema aparecerán aquí.
      </Text>
    </Stack>
  );
}