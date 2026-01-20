import { Router } from 'express';
import { TrackingController } from '../presentation/controllers/TrackingController.js';
import { PrismaTrackingRepository } from '../infrastructure/repositories/PrismaTrackingRepository.js';
import {
    CreateTrackingUseCase,
    DeleteTrackingUseCase,
    GetTrackingUseCase,
    UpdateTrackingUseCase
} from '../application/use-cases/tracking/TrackingUseCase.js';
import {
    CreateTrackingEventUseCase,
    UpdateTrackingEventUseCase,
    DeleteTrackingEventUseCase,
    GetTrackingEventsUseCase
} from '../application/use-cases/tracking/TrackingEventUseCase.js';
import { authenticate, authorize } from '../infrastructure/middlewares/authMiddleware.js';

const router = Router();

// Inicializar repositorio
const trackingRepository = new PrismaTrackingRepository();

// Inicializar use cases de tracking
const getTrackingUseCase = new GetTrackingUseCase(trackingRepository);
const createTrackingUseCase = new CreateTrackingUseCase(trackingRepository);
const updateTrackingUseCase = new UpdateTrackingUseCase(trackingRepository);
const deleteTrackingUseCase = new DeleteTrackingUseCase(trackingRepository);

// Inicializar use cases de eventos
const createTrackingEventUseCase = new CreateTrackingEventUseCase(trackingRepository);
const updateTrackingEventUseCase = new UpdateTrackingEventUseCase(trackingRepository);
const deleteTrackingEventUseCase = new DeleteTrackingEventUseCase(trackingRepository);
const getTrackingEventsUseCase = new GetTrackingEventsUseCase(trackingRepository);

// Inicializar controlador
const trackingController = new TrackingController(
    getTrackingUseCase,
    createTrackingUseCase,
    updateTrackingUseCase,
    deleteTrackingUseCase,
    createTrackingEventUseCase,
    updateTrackingEventUseCase,
    deleteTrackingEventUseCase,
    getTrackingEventsUseCase
);

// ============================================
// RUTAS DE TRACKING
// ============================================

// GET /api/tracking/:trackingId - Obtener un tracking específico
router.get('/:trackingId', trackingController.getOne);

// POST /api/tracking - Crear nuevo tracking
router.post('/', authenticate, authorize('ADMIN'), trackingController.create);

// PUT /api/tracking/:trackingId - Actualizar tracking
router.put('/:trackingId', authenticate, authorize('ADMIN'), trackingController.update);

// DELETE /api/tracking/:trackingId - Eliminar tracking
router.delete('/:trackingId', authenticate, authorize('ADMIN'), trackingController.delete);

// ============================================
// RUTAS DE EVENTOS DE TRACKING
// ============================================

// GET /api/tracking/:trackingId/events - Obtener todos los eventos de un tracking
router.get('/:trackingId/events', authenticate, authorize('ADMIN'), trackingController.getEvents);

// POST /api/tracking/:trackingId/events - Crear un nuevo evento
router.post('/:trackingId/events', authenticate, authorize('ADMIN'), trackingController.createEvent);

// PUT /api/tracking/:trackingId/events/:eventId - Actualizar un evento
router.put('/:trackingId/events/:eventId', authenticate, authorize('ADMIN'), trackingController.updateEvent);

// DELETE /api/tracking/:trackingId/events/:eventId - Eliminar un evento
router.delete('/:trackingId/events/:eventId', authenticate, authorize('ADMIN'), trackingController.deleteEvent);

export default router;