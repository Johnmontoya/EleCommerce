import { useEffect, useState } from 'react';
import Sidebar from '../../../dashboard/components/Sidebar';
import BreadCrumbs from '../../../../shared/ui/BreadCrumbs';
import NavMobile from '../../../dashboard/components/NavMobile';
import ButtonMobile from '../../../../shared/ui/ButtonMobile';
import DashHeader from '../../../../shared/ui/DashHeader';
import HeaderAction from '../../../auth/components/UserCreate/HeaderAction';
import { MdLocalShipping } from 'react-icons/md';
import GeneralInformation from '../../components/FormCreateTracking/GeneralInformation';
import LogisticDimensions from '../../components/FormCreateTracking/LogisticDimensions';
import TrackingEventForm from '../../components/FormCreateTracking/TrackingEventForm';
import ShowHistory from '../../components/FormCreateTracking/ShowHistory';
import PrioritySettings from '../../components/FormCreateTracking/PrioritySettings';
import Metadata from '../../components/FormCreateTracking/Metadata';
import CurrentTransitView from '../../components/FormCreateTracking/CurrentTransitView';
import useInputs from '../../../../shared/hooks/useInputs';
import { AxiosError } from 'axios';
import {
    useTrackingMutation,
    useTrackingEventMutation,
    useUpdateTrackingMutation,
    useDeleteTrackingEventMutation
} from '../../hook/mutation/useTrackingMutation';
import { useLocation } from 'react-router-dom';
import { useTracking } from '../../hook/queries/useTracking';

interface ValidationErrors {
    [key: string]: string[];
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const DashTrackingCreatePage = () => {
    const query = useQuery();
    const orderId = query.get('orderId');
    const trackingNumber = query.get('trackingNumber');

    // Queries y Mutations
    const { data: tracking, isLoading } = useTracking(trackingNumber);
    const createTracking = useTrackingMutation();
    const updateTracking = useUpdateTrackingMutation(trackingNumber!);
    const createEvent = useTrackingEventMutation(tracking?.data?.id!);
    const deleteEvent = useDeleteTrackingEventMutation(tracking?.data?.id!);

    // Estados
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [priority, setPriority] = useState('Medium');
    const [showHistory, setShowHistory] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    // Estado principal del tracking
    const [createData, onChangeCreateData, setCreateData] = useInputs({
        orderId: orderId,
        tracking: {
            trackingNumber: trackingNumber,
            orderNumber: "",
            estimatedDelivery: "",
            origin: "",
            destination: "",
            weight: "",
            dimensions: "",
            carrier: "",
            priority: ""
        }
    });

    // Estado separado para el evento actual
    const [currentEvent, setCurrentEvent] = useState({
        status: "CONFIRMED",
        description: "",
        location: "",
        date: "",
        time: "",
        completed: false,
        order: 1
    });

    // Cargar datos del tracking si existe
    useEffect(() => {
        if (tracking && trackingNumber) {
            setCreateData({
                orderId: orderId,
                tracking: {
                    trackingNumber: trackingNumber,
                    orderNumber: tracking?.data?.orderNumber || "",
                    estimatedDelivery: tracking?.data?.estimatedDelivery || "",
                    origin: tracking?.data?.origin || "",
                    destination: tracking?.data?.destination || "",
                    weight: tracking?.data?.weight || "",
                    dimensions: tracking?.data?.dimensions || "",
                    carrier: tracking?.data?.carrier || "",
                    priority: tracking?.data?.priority || ""
                }
            });
        }
    }, [tracking, trackingNumber, orderId]);

    const priorityOptions = [
        { value: 'Medium', label: 'Normal', color: 'bg-emerald-500' },
        { value: 'High', label: 'Fast', color: 'bg-amber-500' },
        { value: 'Urgent', label: 'ASAP', color: 'bg-red-500' }
    ];

    // Guardar o actualizar el tracking (sin eventos)
    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setIsSubmitting(true);
        setValidationErrors({});

        try {
            const trackingData = {
                orderId: orderId!,
                tracking: {
                    ...createData.tracking,
                    orderNumber: createData.tracking.orderNumber ||
                        `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                    priority: priority
                }
            };

            // Si ya existe el tracking, actualizar, si no, crear
            if (tracking.data !== null) {
                await updateTracking.mutateAsync(trackingData);
            } else {
                await createTracking.mutateAsync(trackingData);
            }

            setIsSubmitting(false);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
            setIsSubmitting(false);
        }
    };

    // Guardar un nuevo evento de tracking
    const handleSaveEvent = async () => {

        try {
            await createEvent.mutateAsync({
                ...currentEvent,
                order: (tracking?.events?.length || 0) + 1
            });

            // Resetear el formulario del evento
            setCurrentEvent({
                status: "CONFIRMED",
                description: "",
                location: "",
                date: "",
                time: "",
                completed: false,
                order: 1
            });

            // Mostrar el historial después de guardar
            setShowHistory(true);
        } catch (error) {
            console.error('Error al guardar evento:', error);
        }
    };

    // Eliminar evento del historial
    const handleDeleteEvent = async (eventId: string) => {
        if (!trackingNumber) return;

        try {
            await deleteEvent.mutateAsync(eventId);
        } catch (error) {
            console.error('Error al eliminar evento:', error);
        }
    };

    const handleReset = () => {
        setCreateData({
            orderId: orderId,
            tracking: {
                trackingNumber: trackingNumber,
                orderNumber: "",
                estimatedDelivery: "",
                origin: "",
                destination: "",
                weight: "",
                dimensions: "",
                carrier: "",
                priority: ""
            }
        });
        setCurrentEvent({
            status: "CONFIRMED",
            description: "",
            location: "",
            date: "",
            time: "",
            completed: false,
            order: 1
        });
    };

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    };

    if (isLoading) {
        return <div className="min-h-screen background-light dark:background-light flex items-center justify-center">
            <div className="text-white">Cargando...</div>
        </div>;
    }

    return (
        <div className="min-h-screen background-light dark:background-light">
            <div className='flex'>
                {/* Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader
                            data={[]}
                            title={tracking?.data !== null ? "Actualizar Envío" : "Crear Envío"}
                            titleData={tracking?.data !== null ? "Actualizar Envío" : "Crear Envío"}
                            path="tracking"
                            titleIcon={<MdLocalShipping className="text-cyan-400" size={36} />}
                            list={false}
                        />
                        <HeaderAction
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            handleReset={handleReset}
                        />

                        {/* Form */}
                        <form>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Content - Left Column */}
                                <div className="col-span-2 space-y-6">
                                    {/* General Information */}
                                    <GeneralInformation
                                        tracking={createData}
                                        onChangeCreateData={onChangeCreateData}
                                    />

                                    {/* Logistics & Dimensions */}
                                    <LogisticDimensions
                                        tracking={createData}
                                        setTracking={setCreateData}
                                        getFieldsError={getFieldsError}
                                    />

                                    {/* Tracking Event Form */}
                                    {
                                        tracking.data !== null && (
                                            <TrackingEventForm
                                                currentEvent={currentEvent}
                                                setCurrentEvent={setCurrentEvent}
                                                handleSaveEvent={handleSaveEvent}
                                                setShowHistory={setShowHistory}
                                                showHistory={showHistory}
                                                trackingHistory={tracking}
                                            //isLoading={createEvent.isPending}
                                            />
                                        )
                                    }

                                    {/* Show History */}
                                    <ShowHistory
                                        showHistory={showHistory}
                                        trackingId={tracking?.data?.id}
                                        setShowHistory={setShowHistory}
                                        handleDeleteEvent={handleDeleteEvent}
                                    />
                                </div>

                                {/* Right Sidebar */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="space-y-6">
                                        {/* Priority Settings */}
                                        <PrioritySettings
                                            priority={priority}
                                            setPriority={setPriority}
                                            priorityOptions={priorityOptions}
                                        />

                                        {/* Metadata */}
                                        <Metadata
                                            metadata={tracking}
                                        />

                                        {/* Current Transit View */}
                                        <CurrentTransitView />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashTrackingCreatePage;