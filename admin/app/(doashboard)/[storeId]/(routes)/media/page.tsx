import { MediaClient } from "./components/media-client";



const MediaManager = ()=>{
    return  <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <MediaClient/>
          </div>
        </div>
}
export default MediaManager;
