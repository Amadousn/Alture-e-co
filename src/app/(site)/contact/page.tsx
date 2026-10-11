import React from "react";
import { Metadata } from "next";
import Contact from "@/app/components/altur/contact";

export const metadata: Metadata = {
  title: "Contact | Alture & Co.",
};

// The same contact block the homepage ends with, on a page of its own.
const ContactPage = () => {
  return (
    <div className="bg-black min-h-[78vh] flex flex-col justify-center pt-24 md:pt-28">
      <Contact />
    </div>
  );
};

export default ContactPage;
