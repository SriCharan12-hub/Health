import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { PatientTable } from '../components/PatientTable';
import { setLoading } from '../features/dashboard/dashboardSlice';
import { PersonIcon, CalendarIcon, HomeIcon, BackpackIcon, PlusIcon } from '@radix-ui/react-icons';
import { Grid, Box, Heading, Text, Flex, Button, Dialog, TextField, Card } from '@radix-ui/themes';

function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const { stats, patients, loading } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Box className="min-h-screen">
      <Header />

      <Box className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section & Action */}
        <Flex justify="between" align="center" mb="6" className="animate-fade-in-up">
          <Box>
            <Heading size="6" mb="2" className="text-black dark:text-white">Dashboard Overview</Heading>
            <Text color="gray" size="2">
              Welcome back, <Text weight="bold" color="gray">{user?.email || 'Dr. Smith'}</Text>. Here's your system at a glance.
            </Text>
          </Box>
          
          <Dialog.Root>
            {/* <Dialog.Trigger>
              <Button size="3" variant="solid" color="indigo" className="cursor-pointer shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95">
                <PlusIcon /> New Appointment
              </Button>
            </Dialog.Trigger> */}

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
                  <Button variant="soft" color="gray" className="cursor-pointer">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={() => alert("Appointment Created!")} className="cursor-pointer">Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>

        {/* Stats Grid */}
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="5" mb="8" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Total Patients"
            value={stats.patients.toLocaleString()}
            trend={{ value: "12% increase", isIncr: true }}
            trendLabel="from last month"
            icon={<PersonIcon className="w-6 h-6" />}
            iconBgColor="bg-blue-500 dark:bg-blue-600"
          />
          <StatCard
            title="Total Doctors"
            value={stats.doctors.toLocaleString()}
            trend={{ value: "5% increase", isIncr: true }}
            trendLabel="new hires"
            icon={<BackpackIcon className="w-6 h-6" />}
            iconBgColor="bg-teal-500 dark:bg-teal-600"
          />
          <StatCard
            title="Total Appointments"
            value={stats.appointments.toLocaleString()}
            trend={{ value: "No change", isIncr: false }}
            trendLabel="vs last week"
            icon={<CalendarIcon className="w-6 h-6" />}
            iconBgColor="bg-indigo-500 dark:bg-indigo-600"
          />
          <StatCard
            title="Active Clinics"
            value={stats.clinics.toLocaleString()}
            trend={{ value: "1 new clinic", isIncr: true }}
            trendLabel="opened recently"
            icon={<HomeIcon className="w-6 h-6" />}
            iconBgColor="bg-emerald-500 dark:bg-emerald-600"
          />
        </Grid>

        {/* Patient Table with Loading State */}
        <Box className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Heading size="4" mb="4" className="text-gray-800 dark:text-gray-100">Recent Patients</Heading>
          <Card size="2">
            <PatientTable patients={patients} loading={loading} />
          </Card>
        </Box>
        
      </Box>
    </Box>
  );
}

export default HomePage;
