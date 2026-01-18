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
    <div className="min-h-screen background-light dark:background-light">
      <BreadCrumbs />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BiPackage size={36} className="text-cyan-400" />
          <h1 className="text-4xl font-bold text-slate-100">Rastrear Envío</h1>
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
          <div className="text-center py-12">
            <BiPackage size={64} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              Ingresa tu número de rastreo para ver el estado de tu envío
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashTrackPage;