import './PriceBenefit.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * 
 * @param {String} benefitInfo is the benefit information for the paid subscription
 * @returns 
 */
export const PriceBenefit = ({benefitInfo}) => {
    return (
        <>
            <div className="price-benefit-container">
                <div className="benefit-check">
                 <FontAwesomeIcon icon="fa-regular fa-circle-check" />
                </div>
                <div className="benefit-information">
                    {benefitInfo}
                </div>
            </div>
        </>
    )
};