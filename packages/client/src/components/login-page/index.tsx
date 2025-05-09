'use client';

import { login } from '@/api/login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Role } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  phone: z.string().min(13).max(13),
  password: z.string().min(8),
});

export default function LoginPage({ role }: { role: Role }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data.phone, data.password, role);
      router.push('/');
      window.location.href = '/';
    } catch (error) {
      toast.error('Failed to login: invalid phone or password');
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full md:w-150 mx-auto flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{role === 'admin' ? 'Admin Login' : 'Login'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex-1"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+380XXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => {
                if (role === 'admin') {
                  window.location.href = '/login'; // Redirect to the user login page
                } else {
                  window.location.href = '/admin'; // Redirect to the admin login page
                }
              }}
            >
              Switch to {role === 'admin' ? 'User Login' : 'Admin Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
