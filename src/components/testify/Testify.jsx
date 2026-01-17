import React from 'react'
import '../../components/testify/testify.css'

const Testify = () => {
  return (
    <div className='testifywrapper'>
        <h2>TESTIMONIALS</h2>
        <div className='testifyboxhold'>
            <div className='testifyboxinner'>
                {/* <div className='testifyimgbox'></div> */}
                <img src="images/roundpics3.jpeg" alt="" />
                <h3>Mrs Louis</h3>
                <p className="source">FROM DONOR</p>
                <div className='testifywriteup'>
                <p className="testimonial">
                “I never knew how it was easy to donate blood until i found <br /> ALIFE. Now i donate <br /> regularly and feel great  knowing <br /> I’m saving lives.”
                </p>
                </div>
            </div>
            <div className='testifyboxinner'>
                <img src="images/roundpics.jpeg" alt="" />
                <h3>MANAGER</h3>
                <p className='source'>FROM HOSPITAL</p>
                <div className='testifywriteup'>
                    <p className='testimonial'>“ALIFE has helped us maintain a steady supply of blood,<br /> ensuring that patients in critical <br />conditions get help on time.”</p>
                </div>
            </div>
            <div className='testifyboxinner'>
                <img src="images/roundpics1.jpeg" alt="" />
                <h3>MARK M.D</h3>
                <p className='source'>FROM BLOOD BANK</p>
                <div className='testifywriteup'>
                    <p className='testimonial'>“Since joining ALIFE, we’ve <br />seen a 30% increase in <br /> donations. The platform makes <br /> it easy to connect with donors.”</p>
                </div>
            </div>
            <div className='testifyboxinner'>
                <img src="images/roundpics4.jpeg" alt="" />
                <h3>MS MARIA</h3>
                <p className='source'>FROM DONOR</p>
                <div className='testifywriteup'>
                    <p className='testimonial'>"The platform makes it easy to <br /> get verified hospitals in need of blood.”</p>
                </div>
            </div>
            <div className='testifyboxinner'>
                <img src="images/roundpics5.png" alt="" />
                <h3>MR LOUIS</h3>
                <p className='source'>FROM DONOR</p>
                <div className='testifywriteup'>
                    <p className='testimonial'>“The joy in my heart knowing I am onboard this platform , and <br />doing my part to prevent blood shortage in my community.”</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testify