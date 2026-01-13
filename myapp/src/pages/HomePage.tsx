import { useAppSelector } from '../store/hooks';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { PersonIcon, CalendarIcon, HomeIcon, BackpackIcon, PlusIcon } from '@radix-ui/react-icons';
import { Grid, Box, Heading, Text, Flex, Button, Dialog, TextField } from '@radix-ui/themes';

function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const stats = useAppSelector((state) => state.dashboard.stats);

  return (
    <Box className="min-h-screen bg-gray-50">
      <Header />

      <Box className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section & Action */}
        <Flex justify="between" align="center" mb="6">
          <Box>
            <Heading size="6" mb="2" className="text-gray-800">Dashboard Overview</Heading>
            <Text color="gray" size="2">
              Welcome back, <Text weight="bold" color="gray">{user?.email || 'Dr. Smith'}</Text>. Here's your system at a glance.
            </Text>
          </Box>
          
          <Dialog.Root>
            <Dialog.Trigger>
              <Button size="3" variant="solid" color="indigo" className="cursor-pointer">
                <PlusIcon /> New Appointment
              </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Book Appointment</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Schedule a new appointment for a patient.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">Patient Name</Text>
                  <TextField.Root placeholder="Enter patient name" />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">Date</Text>
                  <TextField.Root placeholder="YYYY-MM-DD" />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={() => alert("Appointment Created!")}>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>

        {/* Stats Grid */}
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="5">
          <StatCard
            title="Total Patients"
            value={stats.patients.toLocaleString()}
            trend={{ value: "12% increase", isIncr: true }}
            trendLabel="from last month"
            icon={<PersonIcon className="w-6 h-6" />}
            iconBgColor="bg-blue-500"
          />
          <StatCard
            title="Total Doctors"
            value={stats.doctors.toLocaleString()}
            trend={{ value: "5% increase", isIncr: true }}
            trendLabel="new hires"
            icon={<BackpackIcon className="w-6 h-6" />}
            iconBgColor="bg-teal-500"
          />
          <StatCard
            title="Total Appointments"
            value={stats.appointments.toLocaleString()}
            trend={{ value: "No change", isIncr: false }}
            trendLabel="vs last week"
            icon={<CalendarIcon className="w-6 h-6" />}
            iconBgColor="bg-indigo-500"
          />
          <StatCard
            title="Active Clinics"
            value={stats.clinics.toLocaleString()}
            trend={{ value: "1 new clinic", isIncr: true }}
            trendLabel="opened recently"
            icon={<HomeIcon className="w-6 h-6" />}
            iconBgColor="bg-emerald-500"
          />
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
