
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, User, HelpCircle, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const navigationItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home,
      description: 'Discover amazing places'
    },
    { 
      name: 'Search', 
      path: '/search', 
      icon: Search,
      description: 'Find your perfect stay'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: User,
      description: 'Manage your account',
      authRequired: true
    },
    { 
      name: 'Privacy', 
      path: '/privacy', 
      icon: HelpCircle,
      description: 'Privacy & Terms'
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    !item.authRequired || (item.authRequired && user)
  );

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getNavClassName = (isActive: boolean) => 
    isActive 
      ? 'bg-rose-50 text-rose-700 border-r-2 border-rose-500' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2 text-rose-500 px-2">
            <MapPin className="h-4 w-4" />
            {!collapsed && <span>Navigation</span>}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.path} 
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${getNavClassName(isActive)}`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-rose-500' : 'text-gray-500'}`} />
                        {!collapsed && (
                          <div>
                            <div className={`font-medium ${isActive ? 'text-rose-700' : 'text-gray-900'}`}>
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info Section */}
        {user && !collapsed && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">Welcome!</div>
                <div className="text-sm text-gray-500 truncate">{user.email}</div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
