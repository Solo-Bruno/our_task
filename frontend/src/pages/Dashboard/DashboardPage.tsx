import {
  SimpleGrid,
  Card,
  Text,
  Group,
  RingProgress,
  Stack,
  Title,
  Badge,
  Box,
} from '@mantine/core';
import {
  IconFolderOpen,
  IconCheckbox,
  IconClock,
  IconUsers,
} from '@tabler/icons-react';

const stats = [
  { label: 'Proyectos activos', value: 4,  icon: IconFolderOpen, color: 'violet', progress: 70 },
  { label: 'Tareas pendientes', value: 12, icon: IconCheckbox,   color: 'indigo', progress: 45 },
  { label: 'En progreso',       value: 7,  icon: IconClock,      color: 'cyan',   progress: 58 },
  { label: 'Miembros',          value: 9,  icon: IconUsers,      color: 'teal',   progress: 90 },
];

export function DashboardPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Text size="sm" c="dimmed">Bienvenido de nuevo 👋</Text>
          <Title order={2} fw={700}>Dashboard</Title>
        </Box>
        <Badge variant="light" color="violet">Sprint activo</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map((stat) => (
          <Card key={stat.label} withBorder radius="md" p="lg">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  {stat.label}
                </Text>
                <Text size="xl" fw={800}>
                  {stat.value}
                </Text>
              </Stack>
              <RingProgress
                size={60}
                thickness={5}
                roundCaps
                sections={[{ value: stat.progress, color: stat.color }]}
                label={
                  <stat.icon
                    size={18}
                    style={{ display: 'block', margin: 'auto' }}
                    color={`var(--mantine-color-${stat.color}-6)`}
                  />
                }
              />
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Card withBorder radius="md" p="lg" mih={200}>
        <Text fw={600} mb="md">Actividad reciente</Text>
        <Text c="dimmed" size="sm">
          Conectá tu backend para ver la actividad aquí.
        </Text>
      </Card>
    </Stack>
  );
}