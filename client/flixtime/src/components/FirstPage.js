import React from "react";

function FirstPage({ groupSize, setGroupSize, maxGroupSize, page, setPage }) {
  return (
    <div className="firstpage">
      <div className="firstpage__container">
        <div className="test">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="firstpage__title">
              <h1> FLIX TIME </h1>
              <h3> Group Movie Recommendation System </h3>
            </div>
            <div className="firstpage__body">
              <p> Enter your group size : </p>
              <input
                type="number"
                placeholder="Group Size"
                min="2"
                max={maxGroupSize}
                value={groupSize}
                onChange={(e) => {
                  setGroupSize(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-footer">
              <button
                onClick={() => {
                  setPage((currPage) => currPage + 1);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  Next
                  <box-icon
                    name="chevron-right-circle"
                    type="solid"
                    color="#bfcddd"
                  ></box-icon>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="firstpage__bgimage">
        <img src="/img/Pik.png" alt="bgimg" />
      </div>
    </div>
  );
}

export default FirstPage;
