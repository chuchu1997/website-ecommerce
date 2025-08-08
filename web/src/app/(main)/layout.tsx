/** @format */

import { BodyContainer } from "@/components/BodyContainer";
export const revalidate = 120; // ISR 5 phút

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full ">
      <BodyContainer className="mt-[90px] sm:mt-[80px]">
        {children}
      </BodyContainer>
      {/* <BodyContainer className="mt-[90px] sm:mt-[65px]">
                  {children}
                </BodyContainer> */}
      {/* <BlockSidebar />
                 <MobileGroupButton /> */}
    </div>
  );
}
