'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

// Types based on the observed schema
type Department = {
  department_id: number;
  address: string;
};

type Manager = {
  staff_name: string;
  surname: string;
  patronymic: string;
  manager_id: number;
  phone_num: string;
  department_id: number;
  department_address: string;
  subordinate_count: string;
};

export default function DepartmentPage() {
  const { id } = useParams();

  // Data fetching with useSWR
  const {
    data: department,
    error: departmentError,
    isLoading: isDepartmentLoading,
  } = useSWR<Department>(`/departments/${id}`, apiGetFetcher);

  const {
    data: managers,
    error: managersError,
    isLoading: isManagersLoading,
  } = useSWR<Manager[]>(`/departments/${id}/managers_info`, apiGetFetcher);

  // Error states
  if (departmentError) return <div>Failed to load department</div>;
  if (managersError) return <div>Failed to load managers</div>;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Department Details
        </h1>
        <Badge variant="outline" className="text-sm px-3 py-1">
          ID: {id}
        </Badge>
      </div>

      {/* Department Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Department Information</CardTitle>
          <CardDescription>Address and contact details</CardDescription>
        </CardHeader>
        <CardContent>
          {isDepartmentLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="font-medium">Address:</div>
                <div className="col-span-3">{department?.address}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Managers List */}
      <Card>
        <CardHeader>
          <CardTitle>Department Managers</CardTitle>
          <CardDescription>Staff managing this department</CardDescription>
        </CardHeader>
        <CardContent>
          {isManagersLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : managers && managers.length > 0 ? (
            <div className="space-y-6">
              {managers.map((manager) => (
                <div
                  key={manager.manager_id}
                  className="flex items-center space-x-4"
                >
                  <div>
                    <div className="font-medium">
                      {manager.surname} {manager.staff_name}{' '}
                      {manager.patronymic}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Manager (Subordinates: {manager.subordinate_count})
                    </div>
                    {manager.phone_num && (
                      <div className="text-sm">Phone: {manager.phone_num}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No managers assigned to this department
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
