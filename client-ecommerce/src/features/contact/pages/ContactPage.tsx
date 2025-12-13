import BreadCrumbs from "../../../shared/ui/BreadCrumbs";
import ContactForm from "../components/ContactForm";
import ContactInformation from "../components/ContactInformation";
import MapLocation from "../components/MapLocation";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 pb-6">
      {/* Breadcrumb */}
      <BreadCrumbs />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-slate-100">
              Contacto
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 text-slate-100 gap-6 px-4 pb-8">
        {/* Form Section */}
        <ContactForm />

        {/* Contact Info */}
        <ContactInformation />

        {/* FAQ */}
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl space-y-4">
          <h2 className="text-lg font-semibold">Preguntas Frecuentes</h2>

          <details className="bg-slate-900 p-3 rounded-md">
            <summary className="cursor-pointer font-medium">
              ¿Hacen envíos internacionales?
            </summary>
            <p className="mt-2 text-white/70 text-sm">
              Sí, enviamos a varios países.
            </p>
          </details>

          <details className="bg-slate-900 p-3 rounded-md">
            <summary className="cursor-pointer font-medium">
              ¿Cuál es el tiempo de respuesta?
            </summary>
            <p className="mt-2 text-white/70 text-sm">
              Nuestro tiempo promedio es 24h.
            </p>
          </details>
        </div>
      </div>

      {/* Map Section */}
      <MapLocation />
    </div>
  );
};

export default ContactPage;
