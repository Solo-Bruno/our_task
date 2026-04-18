import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  Stack,
  Avatar,
  Box,
  rem,
  ActionIcon,
  Tooltip,
  Divider,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLayoutDashboard,
  IconFolderOpen,
  IconCheckbox,
  IconUsers,
  IconSun,
  IconMoon,
  IconLogout,
} from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard',  path: '/dashboard', icon: IconLayoutDashboard },
  { label: 'Proyectos',  path: '/projects',  icon: IconFolderOpen },
  { label: 'Mis Tareas', path: '/tasks',      icon: IconCheckbox },
  { label: 'Usuarios',   path: '/users',      icon: IconUsers },
];

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* ── HEADER ── */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg" c="violet">
              FlowDesk
            </Text>
          </Group>

          <Group gap="xs">
            <Tooltip label={colorScheme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
              <ActionIcon
                variant="subtle"
                onClick={() => toggleColorScheme()}
                size="lg"
              >
                {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
              </ActionIcon>
            </Tooltip>
            <Avatar size="sm" radius="xl" color="violet">
              {initials}
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* ── NAVBAR ── */}
      <AppShell.Navbar p="sm">
        <Stack gap={4} flex={1}>
          <Text size="xs" fw={600} c="dimmed" px="sm" mb={4} tt="uppercase">
            Menú
          </Text>

          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                active={active}
                onClick={() => navigate(item.path)}
                style={{ borderRadius: rem(8) }}
              />
            );
          })}
        </Stack>

        {/* ── FOOTER DE LA NAVBAR ── */}
        <Box>
          <Divider mb="sm" />
          <Group px="sm" pb="sm" justify="space-between">
            <Group gap="xs">
              <Avatar size="sm" radius="xl" color="violet">{initials}</Avatar>
              <Box style={{ minWidth: 0 }}>
                <Text size="xs" fw={600} lh={1.2} truncate>{user?.name}</Text>
                <Text size="xs" c="dimmed" lh={1.2} truncate>{user?.email}</Text>
              </Box>
            </Group>
            <Tooltip label="Cerrar sesión">
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                <IconLogout size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Box>
      </AppShell.Navbar>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}