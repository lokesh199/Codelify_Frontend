import { useState } from 'react';
import { ActionIcon, Avatar, Burger, Button, Container, Divider, Drawer, Group, Menu, ScrollArea, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { IconLogout, IconMoon, IconSun } from '@tabler/icons-react';
import { useAuth } from '../AuthContext';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const links = [
  { link: '/', label: 'Home' },
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/contest', label: 'Contests' },
  { link: '/problems', label: 'Problems' }
];

export default function Navbar() {
  const { user, logoutUser, isAuthenticated } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { loginWithGoogle } = useGoogleAuth();

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
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        </div>

        <Group gap={5} visibleFrom="xs" style={{ flex: 2, justifyContent: 'center' }}>
          {items}
        </Group>

        <Group gap="md" visibleFrom="xs" style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ActionIcon
            onClick={toggleColorScheme}
            variant="outline"
            size="lg"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            title="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
          {
            isAuthenticated
              ?
              <Menu shadow="md" width={150}>
                <Menu.Target>
                  <UnstyledButton>
                    <Avatar
                      src={user?.email}
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
                    onClick={logoutUser}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              :
              <Button onClick={loginWithGoogle}>Login/Register</Button>

          }
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