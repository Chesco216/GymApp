import './TermsConditions.css'
import { CloseSVG } from './SVGS';

const TermsConditions = () => {
    return (
        <div className="terms-conditions-container">
            <div className="terms-conditions-component">
                <div className="terms-conditions-header">
                    <h1>Terminos y Condiciones</h1>
                    <button className="terms-btn-exit"><CloseSVG/></button>
                </div>
                <div className="terms-conditions-body">
                    <p>
                        <strong>Última fecha de revisión: Junio 11, 2024</strong><br /><br />

                        <strong>1. Aceptación de Términos</strong><br />
                        Al crear una cuenta en Jayani Power, usted acepta estar sujeto a estos términos y condiciones, así como a nuestra política de privacidad. Si no está de acuerdo con alguna parte de los términos, no podrá utilizar nuestros servicios.<br /><br />

                        <strong>2. Servicios Ofrecidos</strong><br />
                        Jayani Power proporciona planes de ejercicios y dietas personalizados para una duración de cinco días, basados en la información proporcionada por el usuario y generados por inteligencia artificial. Estos servicios están destinados a ayudar a los usuarios a mejorar su salud y bienestar.<br /><br />

                        <strong>3. Registro de Usuario</strong><br />
                        Para utilizar nuestros servicios, debe crear una cuenta proporcionando información precisa y actualizada. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y acepta notificar inmediatamente a Jayani Power sobre cualquier uso no autorizado de su cuenta.<br /><br />

                        <strong>4. Uso de la Información del Usuario</strong><br />
                        La información que proporcione al registrarse y durante el uso de la aplicación será utilizada para personalizar sus planes de ejercicios y dietas. Nos comprometemos a proteger su información personal de acuerdo con nuestra política de privacidad.<br /><br />

                        <strong>5. Contenido Generado por el Usuario</strong><br />
                        Usted es responsable del contenido que cargue, publique o transmita a través de la aplicación. No debe cargar, publicar o transmitir ningún contenido que sea ilegal, ofensivo, difamatorio, obsceno, o que infrinja los derechos de terceros.<br /><br />

                        <strong>6. Exención de Responsabilidad</strong><br />
                        La información proporcionada por Jayani Power no debe ser interpretada como un consejo médico. Consulte a su médico antes de comenzar cualquier programa de ejercicios o dieta. Jayani Power no se hace responsable de ninguna lesión, enfermedad o daño que pueda resultar del uso de nuestros servicios.<br /><br />

                        <strong>7. Modificaciones a los Términos y Servicios</strong><br />
                        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestra aplicación y sitio web. Es su responsabilidad revisar periódicamente estos términos para estar informado de cualquier cambio.<br /><br />

                        <strong>8. Propiedad Intelectual</strong><br />
                        Todos los derechos de propiedad intelectual relacionados con Jayani Power y su contenido, incluyendo pero no limitándose a software, textos, gráficos, logos y marcas, son propiedad de Jayani Power o de sus licenciantes. No se le otorgan derechos o licencias a menos que se indique expresamente en estos términos.<br /><br />

                        <strong>9. Terminación del Servicio</strong><br />
                        Podemos suspender o terminar su cuenta y acceso a nuestros servicios en cualquier momento, sin previo aviso, si creemos que ha violado estos términos y condiciones o si consideramos que dicha medida es necesaria para proteger la seguridad y la integridad de nuestros servicios.<br /><br />

                        <strong>10. Limitación de Responsabilidad</strong><br />
                        En la máxima medida permitida por la ley, Jayani Power no será responsable por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos, o cualquier otra pérdida o daño de cualquier tipo que surja del uso de nuestros servicios.<br /><br />

                        <strong>11. Ley Aplicable</strong><br />
                        Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que se encuentre nuestro domicilio principal, sin dar efecto a ningún principio de conflictos de leyes.<br /><br />

                        <strong>12. Contacto</strong><br />
                        Si tiene alguna pregunta o inquietud acerca de estos términos y condiciones, por favor contacte a nuestro equipo de soporte en jayanipower@gmail.com.<br /><br />

                        Al crear una cuenta en Jayani Power, usted reconoce que ha leído, comprendido y aceptado estos términos y condiciones en su totalidad.
                    </p>

                </div>
                <div className="terms-conditions-footer">
                    <button className="terms-btn-agree">Aceptar y Continuar</button>
                </div>
            </div>
        </div>
    )
}

export default TermsConditions;