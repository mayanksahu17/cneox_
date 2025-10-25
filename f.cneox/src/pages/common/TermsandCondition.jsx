import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer_05";
import { useNavigate, useLocation } from "react-router-dom";

function TermsAndPrivacy() {
  const [activeTab, setActiveTab] = useState("terms");
  const navigate = useNavigate();
  const location = useLocation();

  // Set the active tab based on URL or search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "privacy") {
      setActiveTab("privacy");
    } else {
      setActiveTab("terms");
    }
  }, [location]);

  // Handle tab change and update URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/TermsandCondition?tab=${tab}`, { replace: true });
  };

  return (
    <div className="pt-20 bg-white lg:pt-32">
      <section className="py-12">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => handleTabChange("terms")}
                className={`px-8 py-2 text-sm font-medium rounded-md ${
                  activeTab === "terms"
                    ? "bg-[#4CAF50] text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => handleTabChange("privacy")}
                className={`px-8 py-2 ml-1 text-sm font-medium rounded-md ${
                  activeTab === "privacy"
                    ? "bg-[#4CAF50] text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Page Title */}
          <p className="mb-12 text-4xl font-extrabold text-center text-gray-900 sm:text-4xl">
            {activeTab === "terms" ? "Terms and Conditions" : "Privacy Policy"}
          </p>

          {/* Content Card */}
          <div className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl p-6 sm:p-8">
            {/* Terms and Conditions Content */}
            {activeTab === "terms" && (
              <div>
                {/* Intellectual Property Rights */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Intellectual Property Rights
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Crown Bankers maintains exclusive rights over non-material assets
                  such as trademarks, logos, copyrights, patents, trade secrets, and
                  proprietary software. Unauthorized use, reproduction,
                  distribution, or exploitation of these assets without explicit
                  consent is strictly prohibited.
                </p>

                {/* Use of Website */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Use of Website
                </p>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    License to Use
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Upon entering the Crown Bankers website, users are granted a
                    restricted, non-exclusive, and non-transferable license for
                    personal or internal business purposes, aligning with these
                    Terms of Use. No rights for commercial exploitation are
                    conferred.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Restrictions
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Users are prohibited from engaging in activities that might
                    obstruct or disrupt the website's proper functioning. This
                    includes unauthorized access attempts, the use of automated
                    tools, or involvement in illegal or unethical behaviors.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">Linking</p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    The website may contain links to third-party sites for
                    informational purposes. However, Crown Bankers does not endorse
                    these sites, and users navigate them at their own risk.
                  </p>
                </div>

                {/* Registration Terms */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Registration Terms
                </p>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Eligibility
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    By registering with Crown Bankers, users affirm they are of
                    legal age and possess the capacity to enter binding agreements.
                    If registering on behalf of a company, users must be duly
                    authorized to act on its behalf.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Accurate Information
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Users commit to providing accurate information during
                    registration and promptly updating it in case of any changes.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Account Security
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Maintaining the confidentiality of account credentials is the
                    user's responsibility. Any activities conducted under the
                    account are the user's liability.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Prohibited Activities
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Users pledge not to engage in unauthorized or illegal activities
                    on the Crown Bankers platform, including fraudulent activities,
                    money laundering, or actions contravening relevant laws.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Verification Process
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    As part of registration, users may undergo a verification
                    procedure for identity confirmation, agreeing to provide
                    necessary documentation or information.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Acceptance of Risks
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    By registering with Crown Bankers, users acknowledge and accept
                    the inherent risks associated with investment, understanding the
                    potential for financial losses and gains.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Termination of Account
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Crown Bankers retains the right to terminate or suspend accounts
                    at any time for reasons including but not limited to the breach
                    of these Terms of Use or engagement in suspicious activities.
                  </p>
                </div>



                {/* Withdrawal Terms */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">Withdrawal Terms</p>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">Withdrawal Rules</p>
                  <ul className="list-disc pl-8 mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">
                    <li>ROI and R&B wallet withdrawals can be placed 24/7 without restrictions.</li>
                    <li>
                      Extra Income wallet withdrawals are only allowed on the <strong>1st of every month</strong>. Any attempts on other dates will result in a system message indicating this restriction.
                    </li>
                    <li>
                      In the reports section, charges should <strong>not be displayed</strong> for R&B and Extra Income wallets, as Crown Bankers does not levy any fees on them (0% charge).
                    </li>
                  </ul>
                </div>


                {/* Charges */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">Charges</p>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Fees Overview
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    Users recognize that specific charges and fees may apply to
                    transactions and services. These charges are subject to change
                    and are detailed in the most recent fee schedule on the website.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Third-Party Payment Processors
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    For certain payment services, users may be directed to
                    third-party processors. Crown Bankers is not responsible for the
                    policies or practices of these processors.
                  </p>
                </div>

                {/* Indemnity */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Indemnity
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Users agree to protect and indemnify Crown Bankers against claims,
                  losses, or liabilities arising from their infringement of these
                  terms or any activities on the website conducted under their
                  account.
                </p>

                {/* Data Entry */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Data Entry
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Data provided on the website is retained by Crown Bankers
                  according to the Privacy Policy for verification and operational
                  purposes.
                </p>

                {/* Limitation of Liability */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Limitation of Liability
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Crown Bankers and its associates make no representations or
                  warranties regarding the utilization or outcomes of using the
                  website. They shall not be held liable for errors,
                  misrepresentations, or losses incurred through platform
                  utilization.
                </p>

                {/* Amendments */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Amendments
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Crown Bankers reserves the right to alter these terms without
                  prior notice. Users' continued usage implies agreement to revised
                  terms.
                </p>

                {/* Governing Law */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Governing Law
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  These terms are subject to specified jurisdiction laws, with
                  disputes falling under the exclusive jurisdiction of courts in
                  that jurisdiction.
                </p>

                {/* Contact */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">Contact</p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Users are encouraged to promptly reach out at{" "}
                  <a
                    href="mailto:crownbankers.com@gmail.com"
                    className="text-green-600 transition-colors hover:text-green-500"
                  >
                    crownbankers.com@gmail.com
                  </a>{" "}
                  to report issues and obtain solutions.
                </p>
              </div>
            )}

            {/* Privacy Policy Content */}
            {activeTab === "privacy" && (
              <div>
                {/* Introduction */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Introduction
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Crown Bankers ("we", "our", or "us") is committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy outlines how we collect, 
                  use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                {/* Information We Collect */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Information We Collect
                </p>
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Personal Information
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    We may collect personal information including but not limited to:
                  </p>
                  <ul className="list-disc pl-8 mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">
                    <li>Name, email address, and contact details</li>
                    <li>Login credentials and account information</li>
                    <li>Financial information necessary for transactions</li>
                    <li>Identification documents for verification purposes</li>
                    <li>Any other information you provide voluntarily</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <p className="mb-2 text-xl font-bold text-gray-800">
                    Automatically Collected Information
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    When you access our website, we may automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-8 mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referral sources and navigation paths</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                {/* How We Use Your Information */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  How We Use Your Information
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-8 mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and managing your account</li>
                  <li>Verifying your identity and preventing fraud</li>
                  <li>Communicating with you about updates, security alerts, and support</li>
                  <li>Improving our website and customer experience</li>
                  <li>Complying with legal obligations and industry regulations</li>
                </ul>

                {/* Data Security */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Data Security
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                {/* Third-Party Disclosure */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Third-Party Disclosure
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-8 mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  <li>Service providers who assist us in operating our website and business</li>
                  <li>Financial institutions and payment processors to facilitate transactions</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                  <li>Business partners with your consent or as necessary to provide services</li>
                </ul>

                {/* Your Rights */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Your Rights
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-8 mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  <li>Accessing and receiving a copy of your data</li>
                  <li>Rectifying inaccurate or incomplete information</li>
                  <li>Requesting deletion of your personal data</li>
                  <li>Restricting or objecting to certain processing activities</li>
                  <li>Data portability to another service provider</li>
                </ul>

                {/* Cookies and Tracking */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Cookies and Tracking
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  You can modify your browser settings to decline cookies, but this may affect certain 
                  functionality of our website.
                </p>

                {/* Updates to Privacy Policy */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Updates to Privacy Policy
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the effective date.
                </p>

                {/* Contact Us */}
                <p className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  If you have any questions or concerns about our Privacy Policy or data practices, please contact us at{" "}
                  <a
                    href="mailto:crownbankers.com@gmail.com"
                    className="text-green-600 transition-colors hover:text-green-500"
                  >
                    crownbankers.com@gmail.com
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TermsAndPrivacy;
