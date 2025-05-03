'use client';

import { logout } from '@/api/logout';
import { AuthContext } from '@/app/AuthContext';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

import { useRouter } from 'next/navigation';

export function MainNav() {
  const { userId, role } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="border-b w-full sticky top-0 z-50 bg-background print:hidden">
      <div className="flex h-16 items-center px-4 mx-auto">
        <NavigationMenu className="flex justify-between w-full">
          <NavigationMenuList className="flex gap-4 items-center">
            <NavigationMenuItem>
              <Link href="/" passHref className="font-bold text-lg">
                GymDB
              </Link>
            </NavigationMenuItem>
            {role === 'admin' && (
              <>
                <NavigationMenuItem>
                  <Link href="/staff" passHref>
                    Staff
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/visitors" passHref>
                    Visitors
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/departments" passHref>
                    Departments
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/suppliers" passHref>
                    Suppliers
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contracts" passHref>
                    Contracts
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/trainings" passHref>
                    Trainings
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            {role === 'user' && (
              <NavigationMenuItem>
                <Link href="/dashboard" passHref>
                  Dashboard
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
          <NavigationMenuList>
            {userId ? (
              <NavigationMenuItem>
                <Button
                  size="default"
                  variant="destructive"
                  onClick={async () => {
                    if (role) {
                      try {
                        await logout(userId, role);
                        router.push('/login');
                      } catch (error) {
                        toast.error('Failed to logout');
                        console.error(error);
                      }
                    }
                  }}
                >
                  Logout
                </Button>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <Link href="/login" passHref>
                  <Button size="default">Login</Button>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
