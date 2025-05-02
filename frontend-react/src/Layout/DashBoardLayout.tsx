import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/Dashboard/app-sidebar';

const DashBoardLayout = () => {
  const location = useLocation();
  
  // Convert URL path into breadcrumb items
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.length > 0 && <BreadcrumbSeparator />}
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                const pathUrl = `/${pathSegments.slice(0, index + 1).join("/")}`;
                
                return (
                  <React.Fragment key={pathUrl}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={pathUrl}>{decodeURIComponent(segment)}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
