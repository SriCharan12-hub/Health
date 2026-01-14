import { useState } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { removeToken } from '../utils/auth';
import { DropdownMenu, Button, Avatar, Flex, Text, Box, AlertDialog } from '@radix-ui/themes';
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xs backdrop-blur-md transition-colors duration-200">
      {/* Brand */}
      <Flex align="center" gap="2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <Text size="5" weight="bold" className="text-gray-800 dark:text-white tracking-tight">Healthcare Admin</Text>
      </Flex>


      
      {/* User Actions */}
      <Flex align="center" gap="4">

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <span className="text-xl leading-none">{theme === "dark" ? "🌙" : "☀️"}</span>
          </button>
        </div>

    
      <Flex align="center" gap="4">
        <Box>
          <AlertDialog.Root open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" color="gray" className="cursor-pointer">
                  <Flex align="center" gap="2">
                    <Avatar
                      size="2"
                      src=""
                      fallback="DS"
                      color="blue"
                      radius="full"
                    />
                    <Text weight="medium">Dr. Smith</Text>
                  </Flex>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>{user?.email || 'Dr. Smith'}</DropdownMenu.Label>
                <DropdownMenu.Item 
                  color="red" 
                  className="cursor-pointer"
                  onSelect={() => setShowLogoutDialog(true)}
                >
                  <ExitIcon /> Log Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Confirm Logout</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you want to log out? You will be redirected to the login page.
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray" className="cursor-pointer">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red" onClick={handleLogout} className="cursor-pointer">
                    Log Out
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Box>
      </Flex>
      </Flex>
    </header>
  );
}
