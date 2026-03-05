import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import useInputs from "../../../../shared/hooks/useInputs";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import SelectMethod from "../../components/SelectMethod";
import CardMethod from "../../components/CardMethod";
import CardDelivery from "../../components/CardDelivery";
import CardOnline from "../../components/CardOnline";
import CardFacturation from "../../components/CardFacturation";
import { usePayment } from "../../hook/queries/usePayment";
import { BiDesktop } from "react-icons/bi";

type PaymentMethod = "card" | "cash" | "online";

const DashPaymentPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const { user } = useAuthStore();
    const { data: payment } = usePayment(user?.id!);

    const [paymentData, onChangePaymentData, setPaymentData] = useInputs({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
    })

    const [cardData, onChangeCardData, setCardData] = useInputs({
        id: "",
        userId: user?.id,
        cardNumber: "",
        cardHolder: "",
        cardExpiration: "",
        cardCvv: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    useEffect(() => {
        if (user) {
            setPaymentData({
                fullName: user.firstName,
                email: user.email,
                phone: user.phone,
                address: user.addresses?.[0].street,
                city: user.addresses?.[0].city,
                zipCode: user.addresses?.[0].zipCode,
                country: user.addresses?.[0].country,
            })
            setCardData({
                id: payment?.id,
                userId: user?.id,
                cardNumber: payment?.cardNumber,
                cardHolder: payment?.cardHolder,
                cardExpiration: payment?.cardExpiration,
                cardCvv: payment?.cardCvv,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
    }, [user])

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        value = value.substring(0, 16);
        value = value.match(/.{1,4}/g)?.join(' ') || value;

        e.target.value = value;
        onChangeCardData(e);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        onChangeCardData(e);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 3);
        e.target.value = value;
        onChangeCardData(e);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
            <div className="flex">
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-6 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                            <BiDesktop className="text-[#00f0ff]" size={36} />
                            <h1 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                [PASARELA_DE_PAGO]
                            </h1>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Main Payment Section */}
                            <div className="w-76 lg:col-span-2 space-y-6">
                                {/* Payment Method Selection */}
                                <SelectMethod
                                    selectedMethod={selectedMethod}
                                    setSelectedMethod={setSelectedMethod}
                                />

                                {/* Card Details Form */}
                                <CardMethod
                                    cardData={cardData}
                                    handleExpiryChange={handleExpiryChange}
                                    handleCardNumberChange={handleCardNumberChange}
                                    handleCvvChange={handleCvvChange}
                                    onChangeCardData={onChangeCardData}
                                    selectedMethod={selectedMethod}
                                />

                                {/* Cash on Delivery Info */}
                                <CardDelivery
                                    selectedMethod={selectedMethod}
                                />

                                {/* Online Payment Info */}
                                <CardOnline
                                    selectedMethod={selectedMethod}
                                />

                                {/* Billing Information */}
                                <CardFacturation
                                    paymentData={paymentData}
                                    onChangePaymentData={onChangePaymentData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashPaymentPage;