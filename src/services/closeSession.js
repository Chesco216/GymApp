import { auth } from "./firebase"
async function closeSession() {
    try {
        await auth.signOut()
        window.location.href = '/login'
    } catch (error) {
        console.error("Error cerrando la sesion: ", error.message);
    }
}
export default closeSession;

