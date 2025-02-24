import { School } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator } from './dropdown-menu';
import { Button } from './button';

const Navbar = () => {
    const user = true;
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800  border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className="hidden md:block front-extrabold text-2xl" >BiteAcedmey</h1>
                    {/* User icon and Dark mode icon */}
                </div>
                {
                    user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Open</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                     <DropdownMenuItem> My learning</DropdownMenuItem>
                                    <DropdownMenuItem> Edit Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Log out</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button variant="outline">Login</Button>
                            <Button>Sign Up</Button>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Navbar