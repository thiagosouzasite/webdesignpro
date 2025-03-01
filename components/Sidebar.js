import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon, 
  UserIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  DocumentTextIcon,
  CubeIcon
} from '@heroicons/react/outline';

export default function Sidebar() {
  const router = useRouter();
  
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Leads', href: '/leads', icon: UserIcon },
    { name: 'Clientes', href: '/clientes', icon: UsersIcon },
    { name: 'Projetos', href: '/projetos', icon: BriefcaseIcon },
    { name: 'Orçamentos', href: '/orcamentos', icon: DocumentTextIcon },
    { name: 'Produtos', href: '/produtos', icon: CubeIcon },
  ];
  
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 pt-16 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = router.pathname.startsWith(item.href);
            
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 