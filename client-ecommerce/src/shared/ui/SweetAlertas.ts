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
        title: `¿${message}?`,
        text: "No se podra revertir la accion",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        confirmButtonText: "Borrar",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
            Swal.fire({
                title: "Exito",
                text: "El elemento ha sido borrado",
                icon: "success",
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
    });
}

function OnDialogFail({ message }: SuccessAlertProps) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
    });
}

export default {
    OnDialogChoose,
    OnDialogSuccess,
    OnDialogFail,
};