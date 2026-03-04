import Swal from "sweetalert2";

interface ConfirmAlertProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

interface SuccessAlertProps {
    message: string;
}

function OnDialogChoose({ message, onConfirm, onCancel }: ConfirmAlertProps) {
    Swal.fire({
        title: `[ACCION_CONFIRMADA]`,
        text: message,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#ff0055",
        cancelButtonColor: "#27272a",
        confirmButtonText: "[EJECUTAR]",
        cancelButtonText: "[CANCELAR]",
        background: "#050505",
        color: "#ffffff",
        customClass: {
            popup: 'border border-zinc-800 rounded-none font-mono tracking-wider',
            title: 'text-[#ff0055] uppercase tracking-widest text-lg font-bold',
            confirmButton: 'rounded-none border-none font-bold tracking-widest uppercase',
            cancelButton: 'rounded-none border-none font-bold tracking-widest uppercase text-zinc-400',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
            Swal.fire({
                title: "[EXITO]",
                text: "ACCION_COMPLETADA_EXITOSAMENTE.",
                icon: "success",
                background: "#050505",
                color: "#e4ff00",
                confirmButtonColor: "#e4ff00",
                confirmButtonText: "[ACEPTAR]",
                customClass: {
                    popup: 'border border-zinc-800 rounded-none font-mono tracking-wider',
                    title: 'text-[#e4ff00] uppercase tracking-widest text-lg font-bold',
                    confirmButton: 'rounded-none border-none text-black font-bold tracking-widest uppercase'
                }
            });
        } else {
            onCancel();
        }
    });
}

function OnDialogSuccess({ message }: SuccessAlertProps) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        background: "#050505",
        color: "#00f0ff",
        customClass: {
            popup: 'border border-zinc-800 rounded-none font-mono tracking-wider',
            title: 'text-[#00f0ff] uppercase tracking-widest font-bold text-sm',
        }
    });
}

function OnDialogFail({ message }: SuccessAlertProps) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        background: "#050505",
        color: "#ff0055",
        customClass: {
            popup: 'border border-zinc-800 rounded-none font-mono tracking-wider',
            title: 'text-[#ff0055] uppercase tracking-widest font-bold text-sm',
        }
    });
}

export default {
    OnDialogChoose,
    OnDialogSuccess,
    OnDialogFail,
};