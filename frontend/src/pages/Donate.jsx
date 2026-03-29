import donate from "../assets/donate.jpg";

const Donate = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{
        backgroundImage: `url(${donate})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-xl p-8 overflow-hidden z-10">
        {/* Decorative Circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-green-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-green-300 rounded-full opacity-40"></div>

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Support Us
        </h2>
        <p className="text-center text-slate-600 mb-8">
          Your contribution helps us continue our work. Donate securely via the account below.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
            Bank Account Details
          </h3>

          <div className="space-y-3 text-slate-700 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Account Name:</span>
              <span>Helping Hands NGO</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Account Number:</span>
              <span>123456789012</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Bank Name:</span>
              <span>National Bank</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">IFSC Code:</span>
              <span>XXXXXX</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">UPI ID:</span>
              <span>ssrwbgdet@upi</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Thank you for your generosity!
        </p>
      </div>
    </section>
  );
};

export default Donate;
