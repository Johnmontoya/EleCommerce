import { Assets } from "../../../assets/assets";

const Features = () => {
  return (
    <div className="bg-slate-800/30 py-1">
      <section className="max-w-7xl mx-auto px-4 my-10">
        <div className="absolute top-210 left-1/2 w-32 h-32 bg-blue-500/30 rounded-full filter blur-3xl animate-float1"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
              <img src={Assets.Features1} className="w-44" />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">ENVIO GRATIS</h4>
            <p className="text-sm text-slate-400">
              Para clientes de EE.UU o pedidos por encima de 15000.
            </p>
          </div>
          <div className="text-center">
            <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
              <img src={Assets.Features2} className="w-44" />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">PAGO SEGURO</h4>
            <p className="text-sm text-slate-400">
              Aceptamos Visa, American Express, Paypal, Payment Mastercard y
              Discover
            </p>
          </div>
          <div className="text-center">
            <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
              <img src={Assets.Features3} className="w-44" />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">Garantía 1 año</h4>
            <p className="text-sm text-slate-400">
              Todos nuestros productos son fabricados con cuidado y cubiertos por un año
              contra defectos de fabricación
            </p>
          </div>
          <div className="text-center">
            <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
              <img src={Assets.Features4} className="w-44" />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">SOPORTE 24/7</h4>
            <p className="text-sm text-slate-400">
              Contactanos 24 horas al dia, 7 dias a la semana. Llama a: 0123-456-789
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
