import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function toast(type, message, title) {
    toastr[type](message, title)
}

export function toastError(message) {
    toast("error",message, "Erro:")
}

export function toastSucced(messege){
    toast("success", messege, '')
}
