import { ExitIcon } from '@radix-ui/react-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { removeToken } from '../utils/auth';
import { DropdownMenu, Button, Avatar, Flex, Text, Box, AlertDialog } from '@radix-ui/themes';

export function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xs">
      {/* Brand */}
      <Flex align="center" gap="2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <Text size="5" weight="bold" className="text-gray-800 tracking-tight">Healthcare Admin</Text>
      </Flex>

      {/* User Actions */}
      <Box>
        <AlertDialog.Root>
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
              <AlertDialog.Trigger>
                <DropdownMenu.Item color="red" onSelect={(e) => e.preventDefault()}>
                  <ExitIcon /> Log Out
                </DropdownMenu.Item>
              </AlertDialog.Trigger>
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
    </header>
  );
}
