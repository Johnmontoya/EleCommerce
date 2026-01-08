import { useEffect, useState } from "react";

const Countdown = ({ targetDate }: any) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer); // Limpieza para evitar fugas de memoria
    }, [targetDate]);

    return (
        <div className="flex flex-row gap-2">
            <div className="relative w-32 h-40 bg-slate-100/20  border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">{timeLeft.hours}</h1>
            </div>
            <div className="relative w-32 h-40 bg-slate-100/20  border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">{timeLeft.minutes}</h1>
            </div>
            <div className="relative w-32 h-40 bg-slate-100/20  border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">{timeLeft.seconds}</h1>
            </div>
        </div>
    );
};

export default Countdown

