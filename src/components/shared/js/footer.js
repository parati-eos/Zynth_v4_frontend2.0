import React from "react";
import image from "../../Asset/parati-logo.png";
export const Footer = () => {
  return (
    <>
    <footer class=" via-[#bce1ff] to-gray-100">
  <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
      <img src={image} class="mr-5 h-6 sm:h-9" alt="logo" />
        <p class="max-w-xs mt-4 text-sm text-gray-300">
        Create your investor presentations in a few minutes using our AI powered pitch deck builder. No design skills needed.
        </p>
        <div class="flex mt-8 space-x-6 text-gray-300">
          {/* <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
            <span class="sr-only"> Facebook </span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a> */}
          <a class="hover:opacity-75" href="https://www.instagram.com/zynth_ai/" target="_blank" rel="noreferrer">
            <span class="sr-only"> Instagram </span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          {/* <a class="hover:opacity-75" href="https://twitter.com/parativentures" target="_blank" rel="noreferrer">
            <span class="sr-only"> Twitter </span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a> */}
          <a class="hover:opacity-75" href="https://www.linkedin.com/company/parati-in/" target="_blank" rel="noreferrer">
    <span class="sr-only">LinkedIn</span>
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fill-rule="evenodd" d="M20.45 0H3.55C1.596 0 0 1.596 0 3.55v16.9C0 22.404 1.596 24 3.55 24h16.9c1.953 0 3.55-1.596 3.55-3.55V3.55C24 1.596 22.404 0 20.45 0zM7.175 20.45H4.45V9.223h2.725v11.227zM5.812 7.996h-.018c-1.826 0-3.003-1.264-3.003-2.839 0-1.611 1.197-2.839 3.037-2.839 1.823 0 3.003 1.228 3.021 2.839-.001 1.575-1.18 2.839-3.037 2.839zm15.637 12.454H16.9v-5.924c0-1.419-.507-2.381-1.769-2.381-1.34 0-2.141.896-2.491 1.761-.128.309-.158.738-.158 1.173v5.371h-2.725s.036-7.504 0-8.274h2.725v1.174c.363-.56 1.012-1.361 2.467-1.361 1.8 0 3.15 1.182 3.15 3.716v5.745z"/>
    </svg>
</a>

<a class="hover:opacity-75" href="https://parati-in.medium.com/" target="_blank" rel="noreferrer">
    <span class="sr-only">Dribbble</span>
    <svg class="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fill-rule="evenodd" d="M8.5 7A8.5 8.5 0 108.5 24 8.5 8.5 0 108.5 7zM22 8A4 7.5 0 1022 23 4 7.5 0 1022 8zM28.5 9A1.5 6.5 0 1028.5 22 1.5 6.5 0 1028.5 9z" clip-rule="evenodd" />
    </svg>
</a>

        </div>
        
      </div>
      <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="font-medium text-white">
            Company
          </p>
          <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/about-us">About </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/impactdb">Impact DB </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/eos">Parati Eos</a>
          </nav>
        </div>
        <div>
          <p class="font-medium text-white">
            Services
          </p>
          <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/business-strategy"> Business Strategy </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/investor-relations"> Investor Relation </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/managed-operations"> Managed Operations </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/digital-transformation"> Digital Transformation </a>
          </nav>
        </div>
        <div>
          <p class="font-medium text-white">
            Helpful Links
          </p>
          <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/contact"> Contact </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://www.parati.in/blog"> Blog </a>
          </nav>
        </div>
        <div>
          <p class="font-medium text-white">
            Legal
          </p>
          <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://pitchimage.s3.amazonaws.com/uploads/Privacy+Policy+-+Zynth.pdf" target="_blank"> Privacy Policy </a>
            <a class="hover:opacity-75 hover:text-yellow-500" href="https://pitchimage.s3.amazonaws.com/uploads/Terms+of+Service+-+Zynth.pdf" target="_blank"> Terms &amp; Conditions </a>
            {/* <a class="hover:opacity-75" href> Returns Policy </a> */}
          </nav>
        </div>
      </div>
    </div>
    <p class="mt-8 text-xs text-gray-300">
      © 2024 Parati Technologies Private Limited. All rights reserved.
    </p>
    
  </div>
</footer>
    </>
  );
};