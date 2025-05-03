'use client';

import { Clock, MapPinIcon } from 'lucide-react';

import { BadgeCheck, BadgeX } from 'lucide-react';

import { apiGetFetcher } from '@/api/apiFetch';
import { Staff } from '@/app/staff/staffColumns';
import { Visitor } from '@/app/visitors/visitorsColumns';
import TrainingCard from '@/components/training-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { format, isAfter } from 'date-fns';
import { CalendarIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

export type Abonement = {
  abonement_id: number;
  abonement_type: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  department_id: number;
};

export type Department = {
  department_id: number;
  address: string;
};

export type AbonementType = {
  abonement_type: string;
  price: number;
};

export type Training = {
  visitor_id: number;
  staff_id: number;
  date_of_begin: string;
  date_of_end: string;
};

export default function Dashboard() {
  const { userId: id } = useContext(AuthContext);
  const [user, setUser] = useState<Visitor>({} as Visitor);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [abonementTypes, setAbonementTypes] = useState<AbonementType[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await apiGetFetcher(`/visitors/${id}`);
      const departmentsData = await apiGetFetcher(`/departments`);
      const abonementTypesData = await apiGetFetcher(`/abonement-types`);
      const trainingsData = await apiGetFetcher(`/visitors/${id}/trainings`);
      const staffData = await apiGetFetcher(`/staff`);
      setUser(userData);
      setDepartments(departmentsData);
      setAbonementTypes(abonementTypesData);
      setTrainings(trainingsData);
      setStaff(staffData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Calculate days remaining for active abonement
  // const calculateDaysRemaining = () => {
  //   if (!abonement) return 0;

  //   const endDate = new Date(abonement.end_date);
  //   const today = new Date();
  //   const diffTime = endDate.getTime() - today.getTime();
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   return diffDays > 0 ? diffDays : 0;
  // };

  // // const daysRemaining = calculateDaysRemaining();
  // // const totalDays = abonement
  // //   ? Math.ceil(
  // //       (new Date(abonement.end_date).getTime() -
  // //         new Date(abonement.start_date).getTime()) /
  // //         (1000 * 60 * 60 * 24),
  // //     )
  // //   : 0;
  // // const progressPercentage =
  // //   totalDays > 0 ? ((totalDays - daysRemaining) / totalDays) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading dashboard...</h2>
          <Progress value={45} className="w-[300px]" />
        </div>
      </div>
    );
  }

  // Get department for active abonement
  const activeDepartment = user.abonements[0];
  const abonement = user.abonements[0];

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* User Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.visitor_name} ${user.surname}`}
                alt={`${user.visitor_name} ${user.surname}`}
              />
              <AvatarFallback>
                {user.visitor_name.charAt(0)}
                {user.surname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">
              {user.visitor_name} {user.patronymic} {user.surname}
            </h3>
            <p className="text-muted-foreground mt-1">ID: {user.id}</p>
            <div className="flex items-center mt-4 gap-2">
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone_num}</span>
            </div>
            <div className="flex items-center mt-2 gap-2">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center mt-2 gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                Born:{' '}
                {user.birth_date
                  ? format(new Date(user.birth_date), 'PPP')
                  : 'N/A'}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center"></CardFooter>
        </Card>

        {/* Active Abonement Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Current Abonement</CardTitle>
                <CardDescription>
                  Your active subscription details
                </CardDescription>
              </div>
              {isAfter(new Date(abonement?.end_date), new Date()) ? (
                <Badge className="bg-green-500 hover:bg-green-600">
                  <BadgeCheck className="h-4 w-4 mr-1" /> Active
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <BadgeX className="h-4 w-4 mr-1" /> Expired
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {abonement ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Abonement Type
                    </h4>
                    <p className="text-lg font-semibold">
                      {abonement.abonement_type}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Price
                    </h4>
                    <p className="text-lg font-semibold">
                      {
                        abonementTypes.find(
                          (t) => t.abonement_type === abonement.abonement_type,
                        )?.price
                      }{' '}
                      $
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Start Date
                    </h4>
                    <p>{format(new Date(abonement.start_date), 'PPP')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      End Date
                    </h4>
                    <p>{format(new Date(abonement.end_date), 'PPP')}</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Training Location</h4>
                      <p className="text-muted-foreground">
                        {activeDepartment?.department_address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-xl font-semibold mb-2">
                  No Active Abonement
                </h3>
                <p className="text-muted-foreground mb-4">
                  You do not have an active subscription at the moment.
                </p>
                {/* <Button>Purchase New Abonement</Button> */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Department Information */}
      <Card>
        <CardHeader>
          <CardTitle>Available Departments</CardTitle>
          <CardDescription>
            Locations where you can use your abonement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => (
              <div
                key={department.department_id}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Department #{department.department_id}
                    </h3>
                    <p className="text-muted-foreground">
                      {department.address}
                    </p>
                    {activeDepartment?.department_id ===
                      department.department_id && (
                      <Badge className="mt-2 bg-green-500 hover:bg-green-600">
                        Your Current Location
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Trainings</CardTitle>
          <CardDescription>Your training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {trainings.map((training) => (
              <TrainingCard
                key={training.staff_id + training.date_of_begin}
                trainerName={
                  staff.find((s) => s.id === training.staff_id)?.staff_name ??
                  'Unknown'
                }
                traineeName={user.visitor_name}
                startTime={new Date(training.date_of_begin)}
                endTime={new Date(training.date_of_end)}
                trainerPhone={
                  staff.find((s) => s.id === training.staff_id)?.phone_num ??
                  'Unknown'
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
