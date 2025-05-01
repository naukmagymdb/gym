import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from './ui/button';

export function MainNav() {
  return (
    <div className="border-b w-full sticky top-0 z-50 bg-background">
      <div className="flex h-16 items-center px-4 mx-auto">
        <NavigationMenu className="flex justify-between w-full">
          <NavigationMenuList className="flex gap-4 items-center">
            <NavigationMenuItem>
              <Link href="/" passHref className="font-bold text-lg">
                GymDB
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/staff" passHref className="">
                Staff
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/login" passHref>
                <Button size="default">Login</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
