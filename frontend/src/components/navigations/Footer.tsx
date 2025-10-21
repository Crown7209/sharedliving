"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-50 border-t border-gray-300">
      <div className="max-w-[1280px] w-full mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" prefetch={true}>
              <p className="text-xl font-semibold text-gray-900">
                Shared Living
              </p>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted platform for finding and booking the perfect space
              for your needs.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                prefetch={true}
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                prefetch={true}
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                prefetch={true}
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                prefetch={true}
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/matches"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  prefetch={true}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:support@sharedliving.com"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  support@sharedliving.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+97690201550"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  +976 90201550
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Ulaanbaatar, Mongolia
                  <br />
                  Bayanzurkh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              {currentYear} Shared Living. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                prefetch={true}
              >
                Terms
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                prefetch={true}
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                prefetch={true}
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
