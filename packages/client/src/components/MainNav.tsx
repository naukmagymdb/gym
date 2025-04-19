import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from './ui/button';

export function MainNav() {
  return (
    <div className="border-b w-full fixed z-50 bg-background">
      <div className="flex h-16 items-center px-4 mx-auto">
        <NavigationMenu className="flex justify-between w-full">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className="font-bold text-lg">
                  GymDB
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className="font-bold text-lg">
                  <Button size="default">Login</Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
