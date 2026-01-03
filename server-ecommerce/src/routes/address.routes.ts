import express from 'express';
import { CreateAddressUseCase, DeleteAddressUseCase, GetAddressByIdUseCase, GetAddressByUserIdUseCase, SetDefaultAddressUseCase, UpdateAddressUseCase } from "../application/use-cases/address/AddressUseCase";
import { authenticate } from "../infrastructure/middlewares/authMiddleware";
import { PrismaAddressRepository } from "../infrastructure/repositories/PrismaAddressRepository";
import { AddressController } from "../presentation/controllers/AddressController";

const router = express.Router();

const addressRepository = new PrismaAddressRepository();

const createAddressUseCase = new CreateAddressUseCase(addressRepository);
const getAddressByIdUseCase = new GetAddressByIdUseCase(addressRepository);
const getAddressByUserIdUseCase = new GetAddressByUserIdUseCase(addressRepository);
const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
const setDefaultAddressUseCase = new SetDefaultAddressUseCase(addressRepository);

const addressController = new AddressController(
    createAddressUseCase,
    getAddressByIdUseCase,
    getAddressByUserIdUseCase,
    updateAddressUseCase,
    deleteAddressUseCase,
    setDefaultAddressUseCase
);

router.post('/create', authenticate, addressController.createAddress);
router.get('/get/:id', authenticate, addressController.getAddressById);
router.get('/get-user', authenticate, addressController.getAddressByUserId);
router.put('/update/:id', authenticate, addressController.updateAddress);
router.delete('/delete/:id', authenticate, addressController.deleteAddress);
router.put('/set-default/:id', authenticate, addressController.setDefaultAddress);

export default router;