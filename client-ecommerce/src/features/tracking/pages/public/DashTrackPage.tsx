import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import TrackingSearch from "../../components/TrackingSearch";
import useInputs from "../../../../shared/hooks/useInputs";
import CardStatus from "../../components/CardStatus";
import MapSection from "../../components/MapSection";
import TrackingTimeLine from "../../components/TrackingTimeLine";
import PackageDetails from "../../components/PackageDetails";
import { useTracking } from "../../hook/queries/useTracking";

const DashTrackPage: React.FC = () => {

  const [trackingLoading, setTrackingLoading] = useState<boolean>(false);
  const [isTracking, onChangeTracking] = useInputs({
    trackingNumber: "",
  });
  const { data: trackingData } = useTracking(isTracking.trackingNumber);

  const status = trackingData?.data?.events.length - 1;

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300">
      <BreadCrumbs />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
          <BiPackage size={36} className="text-[#00f0ff]" />
          <h1 className="text-3xl font-bold text-zinc-100 font-mono tracking-widest uppercase">
            [TRACKING_PORTAL]
          </h1>
        </div>

        {/* Tracking Input */}
        <TrackingSearch
          trackingLoading={trackingLoading}
          setTrackingLoading={setTrackingLoading}
          onChangeTracking={onChangeTracking}
          isTracking={isTracking}
        />

        {/* Tracking Results */}
        {trackingData && (
          <>
            {/* Status Overview */}
            <CardStatus
              packageData={trackingData}
            />

            {/* Map Section */}
            <MapSection status={trackingData?.data?.events[status].status} />

            {/* Tracking Timeline & Package Details */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <TrackingTimeLine
                trackingHistory={trackingData}
              />

              {/* Package Details Sidebar */}
              <PackageDetails packageData={trackingData} />
            </div>
          </>
        )}

        {/* Empty State */}
        {!trackingData && !isTracking && (
          <div className="text-center py-16 bg-[#050505] border border-zinc-800 mt-8 relative overflow-hidden group">
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ff0055]/30 group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>

            <BiPackage size={64} className="text-zinc-600 mx-auto mb-6" />
            <p className="text-zinc-400 text-sm font-mono tracking-widest uppercase">
              // AWAITING_TELEMETRY_INPUT
            </p>
            <p className="text-zinc-500 text-xs font-mono mt-2 uppercase">
              ENTER TRACKING SEQUENCE TO ESTABLISH CONNECTION
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashTrackPage;