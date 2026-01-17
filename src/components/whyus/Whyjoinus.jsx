import React from 'react'
import '../../components/whyus/whyjoinus.css'
const Whyjoinus = () => {
    return (
        <div className='whyuswrapper'>
            <h1>WHY JOIN ALIFE</h1>
            <div className='whyinnerwrapper'>
                <div className='whyusinner'>
                    <h4>Easier Connections</h4>
                    <p> Donors, hospitals,<br /> and blood banks all <br />linked in one platform.</p>
                </div>
                <div className='whyusinner'>
                    <h4>Transparent Requests</h4>
                    <p>Hospitals share their <br /> blood needs openly, <br />and donors can respond quickly</p>
                </div>
                <div className='whyusinner'>
                    <h4>Simple Record-Keeping</h4>
                    <p> Donors track their past <br /> donations, hospitals manage <br />requests and appointments.</p>
                </div>
                <div className='whyusinner'>
                    <h4>More Donations, More Lives Saved</h4>
                    <p> A growing donor network means more patients get help faster.</p>
                </div>
            </div>
        </div>
    )
}

export default Whyjoinus