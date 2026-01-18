const FaqQuestion = () => {
  return (
    <div className="md:col-span-3 space-y-3 text-slate-100">
      {/* Active Question */}
      <details
        open
        className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-8 backdrop-blur-sm shadow-xl h-fit text-slate-100"
      >
        <summary className="cursor-pointer text-lg font-semibold">
          ¿Cómo puedo rastrear mi pedido?
        </summary>
        <p className="mt-2 text-sm text-[#e2e8f0]">
          Una vez que tu pedido haya sido enviado, recibirás un correo
          electrónico con un número de seguimiento. Puedes ingresar este número
          en la sección <span className="text-[#00c6ff]">Mis Pedidos</span> de
          tu cuenta para ver el estado actual del envío en tiempo real.
        </p>
        <p className="mt-2 text-xs text-[#94a3b8]">
          Nota: La información de seguimiento puede tardar hasta 24 horas en
          actualizarse después del envío.
        </p>
      </details>

      {/* Questions */}
      <details className="bg-slate-900 p-3 rounded-md">
        <summary className="cursor-pointer font-medium">
          ¿Cuáles son los métodos de pago aceptados?
        </summary>
        <p className="mt-2 text-white/70 text-sm">
          Aceptamos tarjetas, PSE y otros métodos.
        </p>
      </details>

      <details className="bg-slate-900 p-3 rounded-md">
        <summary className="cursor-pointer font-medium">
          ¿Puedo cambiar o cancelar mi pedido?
        </summary>
        <p className="mt-2 text-white/70 text-sm">
          Puedes modificarlo antes de que sea enviado.
        </p>
      </details>

      <details className="bg-slate-900 p-3 rounded-md">
        <summary className="cursor-pointer font-medium">
          ¿Hacen envíos internacionales?
        </summary>
        <p className="mt-2 text-white/70 text-sm">
          Sí, realizamos envíos a varios países.
        </p>
      </details>

      <details className="bg-slate-900 p-3 rounded-md">
        <summary className="cursor-pointer font-medium">
          ¿Qué hago si recibo un producto dañado?
        </summary>
        <p className="mt-2 text-white/70 text-sm">
          Contáctanos inmediatamente para resolverlo.
        </p>
      </details>

      <details className="bg-slate-900 p-3 rounded-md">
        <summary className="cursor-pointer font-medium">
          ¿Cuánto tiempo tengo para realizar una devolución?
        </summary>
        <p className="mt-2 text-white/70 text-sm">
          Tienes hasta 30 días desde la entrega.
        </p>
      </details>
    </div>
  );
};

export default FaqQuestion;
