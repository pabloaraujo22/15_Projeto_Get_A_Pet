import bus from "../utils/bus";

export default function useFlashMessage(props) {
    function setFlashMessage(msg,type) {
        bus.emit({
            message: msg,
            type: type
        })
    }
    return {setFlashMessage}
}