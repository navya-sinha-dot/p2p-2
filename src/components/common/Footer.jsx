import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function TraydrFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-purple-100 to-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Traydr</h3>
            <p className="text-gray-600 mb-4">
              Connecting people to help each other through meaningful exchanges.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-500 hover:text-purple-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-purple-500">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-600 hover:text-purple-500">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-purple-500">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-gray-600 hover:text-purple-500">
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-purple-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-600 hover:text-purple-500">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-purple-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-600 hover:text-purple-500">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/partner"
                  className="text-gray-600 hover:text-purple-500">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-purple-500 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600">
                  123 Azad Nagar Metro Station Andheri west - Mumbai
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="text-purple-500 mr-2 flex-shrink-0"
                />
                <a
                  href="tel:+11234567890"
                  className="text-gray-600 hover:text-purple-500">
                  98023XXXXX
                </a>
              </li>
              <li className="flex items-center">
                <Mail
                  size={18}
                  className="text-purple-500 mr-2 flex-shrink-0"
                />
                <a
                  href="mailto:info@traydr.com"
                  className="text-gray-600 hover:text-purple-500">
                  info@traydr.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-300 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} Traydr. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a
                    href="/accessibility"
                    className="text-gray-600 hover:text-purple-500">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a
                    href="/sitemap"
                    className="text-gray-600 hover:text-purple-500">
                    Sitemap
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-gray-600 hover:text-purple-500">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
