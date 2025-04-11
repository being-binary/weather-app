import { toast , Flip} from 'react-toastify';


export const toastinfo = (message) => {
    toast.info(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip,
    })
}