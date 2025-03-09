export default function LinkShortener() {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-16 mb-12">
      <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Shorten Your Loooong Links :)
      </h1>
      
      <p className="text-center text-gray-400 mb-8">
        DistLink is a distribution, scaling, and shortening service for your links.
      </p>
      
      <div className="w-full relative">
        <div className="flex w-full rounded-full overflow-hidden bg-gray-800 p-1">
          <div className="flex items-center pl-4 flex-grow">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input 
              type="text" 
              placeholder="Enter the link here" 
              className="bg-transparent w-full py-3 focus:outline-none text-white"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition">
            Shorten It!
          </button>
        </div>
        
        <div className="flex items-center mt-3 text-sm text-gray-500 justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="autoPaste" className="mr-2" />
            <label htmlFor="autoPaste">Auto Paste from Clipboard</label>
          </div>
          <div>
            You can create <span className="text-blue-500">05</span> more links. <span className="text-blue-500 hover:text-blue-400 cursor-pointer">Register Now</span> to enjoy Unlimited usage
          </div>
        </div>
      </div>
    </div>
  );
} 