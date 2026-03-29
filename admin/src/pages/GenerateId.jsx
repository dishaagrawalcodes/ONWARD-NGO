import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

const GenerateId = () => {
  const { state } = useLocation();
  const m = state?.member;

  if (!m) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No member data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center  print:bg-white">
      {/* COLUMN WRAPPER */}
      <div className="flex flex-col items-center">
        {/* PRINT BUTTON – ABOVE ID */}
        <button
          onClick={() => window.print()}
          className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold print:hidden"
        >
          Download / Print
        </button>

        {/* ID CARD */}
        <div className="relative w-[360px] h-[520px] text-white shadow-2xl overflow-hidden print:shadow-none border-2 border-red-600">
          {/* BACKGROUND PURPLE */}
          <div className="absolute inset-0 bg-[#6f2dbd]" />

          {/* RED DIAGONAL – PERFECT STRAIGHT CUT */}
          <div
            className="absolute inset-0 bg-red-600"
            style={{
              clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* LOGO WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
            <img
              src="/logo.svg"
              alt="Watermark"
              className="w-[260px] h-[260px] opacity-[0.08]"
            />
          </div>

          {/* HEADER */}

          <div className="relative z-10 bg-white ">
            <div className="absolute top-[2px] left-[6px] text-[9px] font-bold text-red-700">
              REGD NO : 7586
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              {/* LEFT LOGO */}
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />

              {/* CENTER TITLE */}
              <div className="text-center leading-tight">
                <div className="font-extrabold text-[16px] tracking-wide leading-tight">
                  <span className="text-purple-800">R.</span>
                  <span className="text-red-600">MANAVADHIKAR</span>
                </div>

                <div className="text-purple-800 font-extrabold text-[15px] tracking-wide whitespace-nowrap">
                  PRESS CLUB FOUNDATION
                </div>

                {/* REGISTERED STRIP – PERFECT RIBBON */}
                <div className="relative mt-1 flex justify-center">
                  <div className="relative bg-purple-800 text-white text-[6px] px-6 py-[3px] font-semibold tracking-wide leading-none">
                    REGISTERED CENTRAL GOVERNMENT OF INDIA
                    {/* LEFT TRIANGLE */}
                    <span
                      className="absolute left-[-12px] top-0 w-0 h-0
      border-t-[7px] border-b-[7px] border-r-[12px]
      border-t-transparent border-b-transparent border-r-purple-800"
                    />
                    {/* RIGHT TRIANGLE */}
                    <span
                      className="absolute right-[-12px] top-0 w-0 h-0
      border-t-[7px] border-b-[7px] border-l-[12px]
      border-t-transparent border-b-transparent border-l-purple-800"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT LOGO */}
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* PHOTO + QR */}
          <div className="relative px-4 py-4 z-10">
            {/* QR – fixed at top right */}
            <div className="absolute top-4 right-4 bg-white p-1 border-2 border-black">
              <img
                src="/QR.png"
                alt="QR Code"
                className="w-[110px] h-[110px]"
              />
            </div>

            {/* PHOTO – centered, with right padding to avoid QR */}
            <div className="flex justify-center pr-14">
              <div className="bg-white p-1 border-2 border-blue-600">
                <img
                  src={`${BASE_URL}${m.image}`}
                  alt="member"
                  className="w-24 h-28 object-cover"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="relative px-4  pl-10 text-[13px] leading-[1.35] space-y-[2px] font-medium">
            <p>
              <b>NAME :</b> {m.name}
            </p>
            <p>
              <b>FATHER & WIFE OF :</b> {m.fatherName}
            </p>
            <p>
              <b>DESIGNATION :</b> {m.designation}
            </p>
            <p>
              <b>AREA WORKING :</b> {m.areaWorking}
            </p>
            <p>
              <b>ID NO :</b> {m.memberID}
            </p>
            <p>
              <b>MOBILE NO :</b> {m.phone}
            </p>
            <p>
              <b>AADHAR NO :</b> {m.aadharMasked?.replace(/\d(?=\d{4})/g, "X")}
            </p>
            <p>
              <b>VALID TO :</b> {m.validFrom} TO {m.validTo}
            </p>
            <p>
              <b>D.O.B :</b> {m.dob}
            </p>
          </div>

          {/* ADDRESS + PURPLE FILL TILL FOOTER */}
          <div className="relative bg-[#6f2dbd] text-white text-[14px] font-semibold px-10 py-2 pb-10 mt-2">
            <span className="font-bold">Address :</span> {m.address}
          </div>

          {/* FOOTER */}
          <div className="absolute bottom-0 w-full bg-red-600 text-center text-[7px] py-1 font-semibold leading-tight">
            POLICE, CBI, VIGILANCE & OTHER GOVERNMENT DEPT AGAINST CRIME &
            CORRUPTION
            <br />
            <span className="text-[7px] font-bold">WE CAN HELP 24×7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateId;
