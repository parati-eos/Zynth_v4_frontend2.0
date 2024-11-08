import React from 'react'
import '../css/about.css'
import { Footer } from '../../shared/js/footer.js'
import Navbar from '../../shared/js/Home_login.js'
import logo from '../../Asset/parati-team.jpeg'
export default function about() {
  return (
    <div>
      <Navbar />
      <section className="about">
        <h1>About Us</h1>
        <div className="about-info">
          <div className="about-img">
            <img src={logo} alt="Zynth" />
          </div>
          <div
            style={{ marginTop: '-2rem', fontFamily: 'Poppins, sans-serif' }}
          >
            <p>
              Parati was founded in 2019 with the one simple objective - to
              empower small and medium enterprises to start their business and
              expand beyond its horizon.
              <br />
              <br />
              Zynth is Parati's AI-powered business documentation platform
              targeted towards helping startups generate necessary documents in
              minutes.
              <br />
              <br />
              We have launched the first product on Zynth which automates the
              development of an investor deck by collecting a few details around
              the startup and running them through its proprietary algorithms to
              generate an investor-ready on-brand pitch deck.
              <br />
              <br />
              Zynth is the result of years of experience in crafting pitch decks
              for early and growth-stage startups, combined with extensive
              market research and business planning expertise.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="team">
                <h1>Meet Our Team</h1>
                <div className="team-cards flex flex-wrap gap-4">
    <div className="card flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="card-img flex justify-center items-center mb-4">
      <img 
        src="https://static.wixstatic.com/media/aad71c_9a5e97d9d01049bd980216ba763710b0~mv2.jpg/v1/fill/w_230,h_230,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Parth_edited.jpg" 
        alt="Parth Gupta"
        className="w-32 h-32 object-cover rounded-full"
      />
    </div>
    <div className="card-info text-center">
      <h2 className="card-name text-xl font-semibold text-white">Parth Gupta</h2>
      <p className="card-role text-gray-400">Co-Founder</p>
      <p className="card-email text-gray-300">IIM Calcutta | IIT Kanpur</p>
      <p>
      <a href="https://www.linkedin.com/in/parth-gupta-75495223/" target="_blank">
        <button className="button bg-yellow-500 text-white py-2 px-4 rounded">
          Contact
        </button>
      </a>
    </p>
    </div>
  </div> */}
      {/* Card 2 */}
      {/* <div className="card flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="card-img flex justify-center items-center mb-4">
      <img 
        src="https://static.wixstatic.com/media/aad71c_e064c903a3fe4cfa82c2a364b5ff3ebc~mv2.jpg/v1/fill/w_230,h_230,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1532028413103.jpg" 
        alt="Siddharth Gupta"
        className="w-32 h-32 object-cover rounded-full"
      />
    </div>
    <div className="card-info text-center">
      <h2 className="card-name text-xl font-semibold text-white">Miller</h2>
      <p className="card-role text-gray-400">Co-Founder</p>
      <p className="card-email text-gray-300">Miller@example.com</p>
      <p><button className="button bg-yellow-500 text-white py-2 px-4 rounded">Contact</button></p>
    </div>
  </div> */}
      {/* Card 3 */}
      {/* <div className="card flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
  <div className="card-img flex justify-center items-center mb-4">
    <img 
      src="https://static.wixstatic.com/media/aad71c_e064c903a3fe4cfa82c2a364b5ff3ebc~mv2.jpg/v1/fill/w_230,h_230,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1532028413103.jpg" 
      alt="User 3"
      className="w-32 h-32 object-cover rounded-full"
    />
  </div>
  <div className="card-info text-center">
    <h2 className="card-name text-xl font-semibold text-white">Siddharth Gupta</h2>
    <p className="card-role text-gray-400">Co-Founder</p>
    <p className="card-email text-gray-300">IIM Calcutta | IIT Roorkee</p>
    <p>
      <a href="https://www.linkedin.com/in/siddharthgupta92/" target="_blank">
        <button className="button bg-yellow-500 text-white py-2 px-4 rounded">
          Contact
        </button>
      </a>
    </p>
  </div>
</div>

</div>
            </section> */}

      {/* <Footer/> */}
    </div>
  )
}
