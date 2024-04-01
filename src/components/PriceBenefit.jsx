import './PriceBenefit.css'

/**
 * 
 * @param {String} benefitInfo is the benefit information for the paid subscription
 * @returns 
 */
export const PriceBenefit = ({benefitInfo}) => {
    return (
        <>
            <div className="price-benefit-container">
                <div className="checked">
                    checked
                    {
                    //TODO: Add an svg checked symbol 
                    }
                </div>
                <div className="benefit-Information">
                    {benefitInfo}
                </div>
            </div>
        </>
    )
};