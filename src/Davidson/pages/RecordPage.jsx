import React from "react";
import "./recordpage.css";
import { VscVerified } from "react-icons/vsc";
import { AiOutlineFileDone } from "react-icons/ai";
import { GrSave } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";

const RecordPage = () => {
  return (
    <>
      <div className="record-page-cover">
        <div className="record-cards">
          <div className="first-card-green">
            <div className="verify-cnt">
              <VscVerified size={40} />
              <h1>Donations this Month</h1>
              <p>15 donations</p>
            </div>
          </div>
        </div>
        <div className="record-cards">
          <div className="first-card-yellow">
            <div className="verify-cnt">
              <AiOutlineFileDone size={40} />
              <h1>Donations this Month</h1>
              <p>15 donations</p>
            </div>
          </div>
        </div>
        <div className="record-cards">
          <div className="first-card-red">
            <div className="verify-cnt">
              <div className="test-div">
                <GrSave size={40} />
                <h1>Upcomming Appointment</h1>
                <p>5 donor</p>
                <p>appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-sec">
        <button className="submit-btn ">Add Record</button>
      </div>
      <div className="RecordPagePageWrapper">
        <h1>Donation Records</h1>

        <div className="RecordPageCardsHeading2">
          <div className="RecordPageInnerDiv2">
            <h1 className="RecordPageInnerDivtext1">DONOR NAME</h1>
            <h1 className="RecordPageInnerDivtext2">BLOOD TYPE</h1>
            <h1 className="RecordPageInnerDivtext3">
              <MdAccessTime />
              TIME
            </h1>
            <h1 className="RecordPageInnerDivtext4">
              <MdAccessTime />
              DATE
            </h1>
            <h1 className="RecordPageInnerDivtext5">SUCCESSFUL</h1>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Peter Obi</h3>
            <h3 className="RecordPageInnerDivtextBox7">A+</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              9:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Nasa Grace</h3>
            <h3 className="RecordPageInnerDivtextBox7">O-</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Peter Obi </h3>
            <h3 className="RecordPageInnerDivtextBox7">A+</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Mary Amaka </h3>
            <h3 className="RecordPageInnerDivtextBox7">O-</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Nasa Grace</h3>
            <h3 className="RecordPageInnerDivtextBox7">O-</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Chidera Eze </h3>
            <h3 className="RecordPageInnerDivtextBox7">A+</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
        <div className="RecordPageCardsWrapper">
          <div className="RecordPageCards2">
            <h3 className="RecordPageInnerDivtextBox6">Esther Fola </h3>
            <h3 className="RecordPageInnerDivtextBox7">O-</h3>
            <h3 className="RecordPageInnerDivtextBox8">
              <MdAccessTime />
              10:00PM
            </h3>
            <h3 className="RecordPageInnerDivtextBox9">
              <MdAccessTime />
              MAy 23, 2025
            </h3>
            <h3 className="RecordPageInnerDivtext10">SUCCESSFUL</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordPage;
