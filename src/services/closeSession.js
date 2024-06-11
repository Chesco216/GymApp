import { auth } from "./firebase"
async function closeSession() {
    try {
        await auth.signOut()
        localStorage.clear()
        window.location.href = '/'
    } catch (error) {
        console.error("Error cerrando la sesion: ", error.message);
    }
}
export default closeSession;

