const FaqQuestion = () => {
  return (
    <div className="md:col-span-3 space-y-4 text-white font-mono">
      {/* Active Question */}
      <details
        open
        className="bg-[#050505] border border-zinc-800 p-6 relative group open:border-[#00f0ff]/50 transition-colors"
      >
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-[#00f0ff] list-none flex items-center gap-3">
          <span className="text-white group-open:text-[#00f0ff] transition-colors">&gt;</span> ¿Cómo puedo rastrear mi pedido?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm leading-relaxed">
          <p className="mb-4">
            Una vez que tu pedido haya sido enviado, recibirás un correo
            electrónico con un número de seguimiento. Puedes ingresar este número
            en la sección <span className="text-[#00f0ff] border-b border-[#00f0ff]/30 pb-0.5">Mis Pedidos</span> de
            tu cuenta para ver el estado actual del envío en tiempo real.
          </p>
          <p className="text-[#e4ff00] text-xs uppercase tracking-widest font-bold">
            [SYS_NOTE]: La información de seguimiento puede tardar hasta 24 horas en actualizarse después del envío.
          </p>
        </div>
      </details>

      {/* Questions */}
      <details className="bg-[#050505] border border-zinc-800 p-6 relative group transition-colors hover:border-zinc-700">
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-3">
          <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> ¿Cuáles son los métodos de pago aceptados?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm">
          Aceptamos tarjetas, PSE y otros métodos.
        </div>
      </details>

      <details className="bg-[#050505] border border-zinc-800 p-6 relative group transition-colors hover:border-zinc-700">
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-3">
          <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> ¿Puedo cambiar o cancelar mi pedido?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm">
          Puedes modificarlo antes de que sea enviado.
        </div>
      </details>

      <details className="bg-[#050505] border border-zinc-800 p-6 relative group transition-colors hover:border-zinc-700">
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-3">
          <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> ¿Hacen envíos internacionales?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm">
          Sí, realizamos envíos a varios países.
        </div>
      </details>

      <details className="bg-[#050505] border border-zinc-800 p-6 relative group transition-colors hover:border-zinc-700">
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-3">
          <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> ¿Qué hago si recibo un producto dañado?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm">
          Contáctanos inmediatamente para resolverlo.
        </div>
      </details>

      <details className="bg-[#050505] border border-zinc-800 p-6 relative group transition-colors hover:border-zinc-700">
        <summary className="cursor-pointer text-sm font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-3">
          <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> ¿Cuánto tiempo tengo para realizar una devolución?
        </summary>
        <div className="mt-4 pl-5 border-l border-zinc-800 text-zinc-400 text-sm">
          Tienes hasta 30 días desde la entrega.
        </div>
      </details>
    </div>
  );
};

export default FaqQuestion;
