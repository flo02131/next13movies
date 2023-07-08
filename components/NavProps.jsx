'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavProps({href, children}) {
    const path = usePathname();
    const active = href === path;
  return (
    <Link href={href} className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${active ? 'dark:text-blue-500' : 'dark:text-white'} `}>{children}</Link>
  )
}
