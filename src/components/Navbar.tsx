import { useState } from 'react';
import { ActionIcon, Avatar, Burger, Container, Divider, Drawer, Group, Menu, ScrollArea, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { IconLogout, IconMoon, IconSun } from '@tabler/icons-react';

const links = [
  { link: '/', label: 'Home' },
  { link: '/practice', label: 'Practice' },
];

export default function Navbar({ user, onLogout }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner} display="flex" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        {/* 1. Left side placeholder (keeps the center perfectly aligned) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          {/* If you add a Logo later, place it here. For now, we leave it empty or keep it for balance */}
        </div>

        {/* 2. CENTERED LINKS */}
        <Group gap={5} visibleFrom="xs" style={{ flex: 1, justifyContent: 'center' }}>
          {items}
        </Group>

        {/* 3. RIGHT SIDE ITEMS (Dark Mode & User Profile) */}
        <Group gap="md" visibleFrom="xs" style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Dark Mode Switch */}
          <ActionIcon
            onClick={toggleColorScheme}
            variant="outline"
            size="lg"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            title="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>

          {/* User Menu */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Avatar
                  src={user?.picture}
                  radius="xl"
                  color="indigo"
                  style={{ cursor: 'pointer' }}
                />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
                onClick={onLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        {/* Mobile Burger Menu - Stays right-aligned natively when mobile view triggers */}
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
          style={{ marginLeft: 'auto' }}
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {items}
        </ScrollArea>
      </Drawer>
    </header>
  );
}