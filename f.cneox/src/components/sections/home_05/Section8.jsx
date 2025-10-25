
import { Download, Shield, Zap, Users } from "lucide-react"

export default function SimpleAppSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎉 New App Launch
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Download Crown Bankers App</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience secure and fast banking with our new mobile application. Manage your finances anytime, anywhere.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

        <div className="relative w-full h-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-full">
            <img
            src="https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750599228/apk_dcz9si.jpg"
            alt="Crown Bankers App"
            className="w-full h-full object-contain rounded-xl"
            />
        </div>
        </div>




          {/* Right - Features & Download */}
          <div className="space-y-8">
            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Secure Banking</h3>
                  <p className="text-gray-600">Advanced security features to protect your funds</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Fast Transfers</h3>
                  <p className="text-gray-600">Withdraw funds easily</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Easy to Use</h3>
                  <p className="text-gray-600">Simple interface for all your investment needs</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="space-y-4">
              {/* <a
                href="/apk/CrownBankers.apk"
                download
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                Download APK
              </a> */}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⭐ 4.9/5 Rating</span>
                <span>📱 50K+ Downloads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join thousands of users who trust Crown Bankers for their beast Investment journey.
          </p>
          <a
            href="/apk/CrownBankers.apk"
            download
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            Download Now
          </a>
        </div>
      </div>
    </section>
  )
}
