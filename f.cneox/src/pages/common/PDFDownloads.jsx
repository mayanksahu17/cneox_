import { useState } from "react";
import { Download } from "lucide-react";
const PDFDownloads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simplified - just one document in multiple languages
  const documentTitle = "Company Brochure 2025";
const documentDescription = "Download our company brochure (currently available in English only).";
  
  // Multiple language options
  const languages = [
  { code: "en", name: "English", url: "/crown_bankers.pdf" },
  { code: "es", name: "Spanish", url: "/crown_bankers.pdf" },
  { code: "fr", name: "French", url: "/crown_bankers.pdf" },
  { code: "de", name: "German", url: "/crown_bankers.pdf" },
  { code: "it", name: "Italian", url: "/crown_bankers.pdf" },
  { code: "pt", name: "Portuguese", url: "/crown_bankers.pdf" },
  { code: "zh", name: "Chinese", url: "/crown_bankers.pdf" },
  { code: "ja", name: "Japanese", url: "/crown_bankers.pdf" },
  { code: "ko", name: "Korean", url: "/crown_bankers.pdf" },
  { code: "hi", name: "Hindi", url: "/crown_bankers.pdf" },
  { code: "ar", name: "Arabic", url: "/crown_bankers.pdf" },
  { code: "ru", name: "Russian", url: "/crown_bankers.pdf" },
  { code: "tr", name: "Turkish", url: "/crown_bankers.pdf" },
  { code: "nl", name: "Dutch", url: "/crown_bankers.pdf" },
  { code: "sv", name: "Swedish", url: "/crown_bankers.pdf" }
];


  // Filter languages based on search term
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = () => {
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      language: "",
      message: ""
    });
    // Show success message temporarily
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Downloads</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Download our company brochure in your preferred language below.
        </p>
      </div>

      {/* Search input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search languages..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Document card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-16">
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{documentTitle}</h3>
          <p className="text-gray-600 mb-6">{documentDescription}</p>
          
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Available Languages:</h4>
            
            {filteredLanguages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredLanguages.map(lang => (
                  <a
                    key={lang.code}
                    href={lang.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-800 rounded-lg hover:bg-green-100 transition-colors"
                    download
                  >
                    <span>{lang.name}</span>
                    <Download className="w-5 h-5 ml-2" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No languages match your search.</p>
                <button 
                  className="mt-2 text-green-500 hover:text-green-700"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request custom language section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Need the Document in Another Language?</h2>
          <p className="text-gray-600 mt-2">
            If you need our brochure in a language not listed above, please submit a request.
          </p>
        </div>
        
        {formSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-2xl mx-auto mb-6">
            <p className="font-medium">Thank you for your request!</p>
            <p>We'll process your language request and contact you shortly.</p>
          </div>
        ) : null}
        
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Requested Language
            </label>
            <input
              type="text"
              id="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Specify the language"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Any additional details or requirements"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFDownloads;