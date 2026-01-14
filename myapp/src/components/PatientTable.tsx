import { Table, Badge, Avatar, Flex, Text, IconButton, Skeleton } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Patient } from '../features/dashboard/dashboardSlice';

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
}

export function PatientTable({ patients, loading }: PatientTableProps) {
  if (loading) {
    return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Patient</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Condition</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Appointment</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[1, 2, 3].map((i) => (
            <Table.Row key={i}>
              <Table.Cell><Skeleton width="120px" /></Table.Cell>
              <Table.Cell><Skeleton width="80px" /></Table.Cell>
              <Table.Cell><Skeleton width="60px" /></Table.Cell>
              <Table.Cell><Skeleton width="100px" /></Table.Cell>
              <Table.Cell><Skeleton width="20px" /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    );
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Patient</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Condition</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Appointment</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {patients.map((patient) => (
          <Table.Row key={patient.id}>
            <Table.Cell>
              <Flex align="center" gap="3">
                <Avatar size="1" fallback={patient.name[0]} radius="full" color="indigo" />
                <Text weight="medium">{patient.name}</Text>
              </Flex>
            </Table.Cell>
            <Table.Cell>{patient.condition}</Table.Cell>
            <Table.Cell>
              <Badge color={getStatusColor(patient.status)} variant="soft">
                {patient.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{patient.lastAppointment}</Table.Cell>
            <Table.Cell>
              <IconButton variant="ghost" color="gray">
                <DotsHorizontalIcon />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Critical': return 'red';
    case 'Stable': return 'green';
    case 'Recovering': return 'blue';
    default: return 'gray';
  }
}
