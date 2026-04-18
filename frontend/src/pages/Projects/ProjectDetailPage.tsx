import { Stack, Title, Text, Box } from '@mantine/core';
import { useParams } from 'react-router-dom';

export function ProjectDetailPage() {
  const { projectId } = useParams();

  return (
    <Stack gap="xl">
      <Box>
        <Text size="sm" c="dimmed">Detalle del proyecto</Text>
        <Title order={2} fw={700}>Proyecto #{projectId}</Title>
      </Box>
      <Text c="dimmed" size="sm">
        Epochs y tablero Kanban aparecerán aquí en fases posteriores.
      </Text>
    </Stack>
  );
}