/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TileComponent from "./TileComponent";
import { Hotel, School, House, Bed, Disc, Presentation } from "lucide-react";
import PreviewArtileComponent from "@/components/article/PreviewArticle";

export function TabsLayout() {
  return (
    <Tabs defaultValue="chung-cu">
      <TileComponent title="Dự án thiết kế - thi công nội thất" />
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
        <TabsTrigger value="chung-cu">
          <div className="flex flex-col items-center gap-2">
            <Hotel size={40} />
            <div className="">Chung cư</div>
          </div>
        </TabsTrigger>
        <TabsTrigger value="biet-thu">
          <div className="flex flex-col items-center gap-2">
            <School size={40} />
            <span>Biệt thự</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="nha-pho">
          <div className="flex flex-col items-center gap-2">
            <House size={40} />
            <span>Nhà phố</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="phong-ngu">
          <div className="flex flex-col items-center gap-2">
            <Bed size={40} />
            <span>Phòng ngủ</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="phong-khach">
          <div className="flex flex-col items-center gap-2">
            <Disc size={40} />
            <span>Phòng khách</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="van-phong">
          <div className="flex flex-col items-center gap-2">
            <Presentation size={40} />
            <span>Văn phòng</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <div className="tabs-content mt-6 md:mt-4 lg:mt-2">
        <TabsContent value="chung-cu">
          <div className="grid grid-cols-3 gap-4">
            <PreviewArtileComponent />
            <PreviewArtileComponent />
            <PreviewArtileComponent />
            <PreviewArtileComponent />
            <PreviewArtileComponent />
            <PreviewArtileComponent />
          </div>
        </TabsContent>
        <TabsContent value="biet-thu">Biệt thự</TabsContent>
        <TabsContent value="nha-pho">Nhà phố</TabsContent>
        <TabsContent value="phong-ngu">Phòng ngủ</TabsContent>
        <TabsContent value="phong-khach">Phòng khách</TabsContent>
        <TabsContent value="van-phong">Văn phòng</TabsContent>
      </div>
    </Tabs>
  );
}
