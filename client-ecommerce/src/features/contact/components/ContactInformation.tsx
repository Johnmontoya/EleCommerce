import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { MdEmail } from "react-icons/md";

const ContactInformation = () => {
  return (
    <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-lg font-semibold">Información de Contacto</h2>

      <div className="space-y-3 text-white/80 text-sm">
        <div>
          <p className="font-semibold">Dirección Principal</p>
          <p>
            Carrera 13A #9-40
            <br />
            Bogotá, Colombia
          </p>
        </div>

        <div>
          <p className="font-semibold">Correo Electrónico</p>
          <p className="text-[#00c6ff]">soporte@ecommerce.com</p>
          <p>Respuesta en 24h</p>
        </div>

        <div>
          <p className="font-semibold">Llámanos</p>
          <p>(+04) 123 456 7890</p>
          <p>Lun-Vie: 9am - 6pm</p>
        </div>
      </div>

      <div className="flex gap-3 pt-3">
        <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
          <MdEmail size={20} />
        </div>
        <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
          <ImGoogle3 size={20} />
        </div>
        <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
          <FaFacebook size={20} />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
