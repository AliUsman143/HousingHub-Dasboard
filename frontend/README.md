This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


sidebar format 


<!-- "use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import ProfileDropdown from "../components/ProfileDropdown";
const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <main
        className={`flex-1 px-4 sm:px-6 py-6 md:py-8 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      ></main>
    </div>
  );
};

export default page; -->






househub2/
├─ backend/
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ AddProfileUser.js
│  │  └─ User.js
│  ├─ routes/
│  │  └─ userRoutes.js
│  ├─ utils/
│  │  └─ fileUpload.js
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
└─ frontend/
   ├─ .next/
   │  ├─ build/
   │  │  └─ chunks/
   │  │     ├─ [root-of-the-server]__04d7a048._.js
   │  │     ├─ [root-of-the-server]__04d7a048._.js.map
   │  │     ├─ [root-of-the-server]__05f88b00._.js
   │  │     ├─ [root-of-the-server]__05f88b00._.js.map
   │  │     ├─ [turbopack]_runtime.js
   │  │     ├─ [turbopack]_runtime.js.map
   │  │     ├─ node_modules_b5d1def4._.js
   │  │     ├─ node_modules_b5d1def4._.js.map
   │  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js
   │  │     └─ postcss_config_mjs_transform_ts_f0ffbaad._.js.map
   │  ├─ cache/
   │  │  └─ .rscinfo
   │  ├─ server/
   │  │  ├─ app/
   │  │  │  ├─ _not-found/
   │  │  │  │  ├─ page/
   │  │  │  │  │  ├─ app-build-manifest.json
   │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  │  ├─ page.js
   │  │  │  │  └─ page.js.map
   │  │  │  ├─ admin/
   │  │  │  │  ├─ addpackage/
   │  │  │  │  │  ├─ page/
   │  │  │  │  │  │  ├─ app-build-manifest.json
   │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  └─ page.js.map
   │  │  │  │  ├─ package/
   │  │  │  │  │  ├─ page/
   │  │  │  │  │  │  ├─ app-build-manifest.json
   │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  └─ page.js.map
   │  │  │  │  └─ users/
   │  │  │  │     ├─ page/
   │  │  │  │     │  ├─ app-build-manifest.json
   │  │  │  │     │  ├─ app-paths-manifest.json
   │  │  │  │     │  ├─ build-manifest.json
   │  │  │  │     │  ├─ next-font-manifest.json
   │  │  │  │     │  ├─ react-loadable-manifest.json
   │  │  │  │     │  └─ server-reference-manifest.json
   │  │  │  │     ├─ page_client-reference-manifest.js
   │  │  │  │     ├─ page.js
   │  │  │  │     └─ page.js.map
   │  │  │  ├─ favicon.ico/
   │  │  │  │  ├─ route/
   │  │  │  │  │  ├─ app-build-manifest.json
   │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  └─ build-manifest.json
   │  │  │  │  ├─ route.js
   │  │  │  │  └─ route.js.map
   │  │  │  ├─ page/
   │  │  │  │  ├─ app-build-manifest.json
   │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  ├─ build-manifest.json
   │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  └─ server-reference-manifest.json
   │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  ├─ page.js
   │  │  │  └─ page.js.map
   │  │  ├─ chunks/
   │  │  │  ├─ ssr/
   │  │  │  │  ├─ _2766182a._.js
   │  │  │  │  ├─ _2766182a._.js.map
   │  │  │  │  ├─ _327b37a2._.js
   │  │  │  │  ├─ _327b37a2._.js.map
   │  │  │  │  ├─ _5f904819._.js
   │  │  │  │  ├─ _5f904819._.js.map
   │  │  │  │  ├─ _a8e9e9a0._.js
   │  │  │  │  ├─ _a8e9e9a0._.js.map
   │  │  │  │  ├─ _bd0a38c3._.js
   │  │  │  │  ├─ _bd0a38c3._.js.map
   │  │  │  │  ├─ [root-of-the-server]__0a46983d._.js
   │  │  │  │  ├─ [root-of-the-server]__0a46983d._.js.map
   │  │  │  │  ├─ [root-of-the-server]__12ca8719._.js
   │  │  │  │  ├─ [root-of-the-server]__12ca8719._.js.map
   │  │  │  │  ├─ [root-of-the-server]__1f990208._.js
   │  │  │  │  ├─ [root-of-the-server]__1f990208._.js.map
   │  │  │  │  ├─ [root-of-the-server]__40849d86._.js
   │  │  │  │  ├─ [root-of-the-server]__40849d86._.js.map
   │  │  │  │  ├─ [root-of-the-server]__4c58c055._.js
   │  │  │  │  ├─ [root-of-the-server]__4c58c055._.js.map
   │  │  │  │  ├─ [root-of-the-server]__6302eb5e._.js
   │  │  │  │  ├─ [root-of-the-server]__6302eb5e._.js.map
   │  │  │  │  ├─ [root-of-the-server]__7490cfe3._.js
   │  │  │  │  ├─ [root-of-the-server]__7490cfe3._.js.map
   │  │  │  │  ├─ [root-of-the-server]__7f49b5e8._.js
   │  │  │  │  ├─ [root-of-the-server]__7f49b5e8._.js.map
   │  │  │  │  ├─ [root-of-the-server]__86e7898f._.js
   │  │  │  │  ├─ [root-of-the-server]__86e7898f._.js.map
   │  │  │  │  ├─ [root-of-the-server]__a47ffcac._.js
   │  │  │  │  ├─ [root-of-the-server]__a47ffcac._.js.map
   │  │  │  │  ├─ [root-of-the-server]__c75c51b7._.js
   │  │  │  │  ├─ [root-of-the-server]__c75c51b7._.js.map
   │  │  │  │  ├─ [root-of-the-server]__e7b3ff76._.js
   │  │  │  │  ├─ [root-of-the-server]__e7b3ff76._.js.map
   │  │  │  │  ├─ [root-of-the-server]__fb6d91c4._.js
   │  │  │  │  ├─ [root-of-the-server]__fb6d91c4._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_03cb5666._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_03cb5666._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_07f650c7._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_07f650c7._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_20fea547._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_20fea547._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_86d47911._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_86d47911._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_882d36d6._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_882d36d6._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_af967d60._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_af967d60._.js.map
   │  │  │  │  ├─ [turbopack]_runtime.js
   │  │  │  │  ├─ [turbopack]_runtime.js.map
   │  │  │  │  ├─ node_modules_@swc_helpers_cjs_4b7e5fa9._.js
   │  │  │  │  ├─ node_modules_@swc_helpers_cjs_4b7e5fa9._.js.map
   │  │  │  │  ├─ node_modules_46f30577._.js
   │  │  │  │  ├─ node_modules_46f30577._.js.map
   │  │  │  │  ├─ node_modules_71aa50c8._.js
   │  │  │  │  ├─ node_modules_71aa50c8._.js.map
   │  │  │  │  ├─ node_modules_96715ba7._.js
   │  │  │  │  ├─ node_modules_96715ba7._.js.map
   │  │  │  │  ├─ node_modules_9876f0e3._.js
   │  │  │  │  ├─ node_modules_9876f0e3._.js.map
   │  │  │  │  ├─ node_modules_ad3e0e0e._.js
   │  │  │  │  ├─ node_modules_ad3e0e0e._.js.map
   │  │  │  │  ├─ node_modules_bf671b14._.js
   │  │  │  │  ├─ node_modules_bf671b14._.js.map
   │  │  │  │  ├─ node_modules_next_364389b1._.js
   │  │  │  │  ├─ node_modules_next_364389b1._.js.map
   │  │  │  │  ├─ node_modules_next_4f90db6c._.js
   │  │  │  │  ├─ node_modules_next_4f90db6c._.js.map
   │  │  │  │  ├─ node_modules_next_9babd674._.js
   │  │  │  │  ├─ node_modules_next_9babd674._.js.map
   │  │  │  │  ├─ node_modules_next_a39fb6ce._.js
   │  │  │  │  ├─ node_modules_next_a39fb6ce._.js.map
   │  │  │  │  ├─ node_modules_next_dist_0962b827._.js
   │  │  │  │  ├─ node_modules_next_dist_0962b827._.js.map
   │  │  │  │  ├─ node_modules_next_dist_client_components_forbidden-error_ea7ea172.js
   │  │  │  │  ├─ node_modules_next_dist_client_components_forbidden-error_ea7ea172.js.map
   │  │  │  │  ├─ node_modules_next_dist_client_components_unauthorized-error_c8949b27.js
   │  │  │  │  ├─ node_modules_next_dist_client_components_unauthorized-error_c8949b27.js.map
   │  │  │  │  ├─ node_modules_react-icons_fa_index_mjs_9ecd3510._.js
   │  │  │  │  ├─ node_modules_react-icons_fa_index_mjs_9ecd3510._.js.map
   │  │  │  │  ├─ node_modules_react-icons_lib_c05a4bdc._.js
   │  │  │  │  ├─ node_modules_react-icons_lib_c05a4bdc._.js.map
   │  │  │  │  ├─ src_app_a4430781._.js
   │  │  │  │  ├─ src_app_a4430781._.js.map
   │  │  │  │  ├─ src_app_admin_layout_jsx_62faacfd._.js
   │  │  │  │  ├─ src_app_admin_layout_jsx_62faacfd._.js.map
   │  │  │  │  ├─ src_app_admin_layout_jsx_e96918fb._.js
   │  │  │  │  └─ src_app_admin_layout_jsx_e96918fb._.js.map
   │  │  │  ├─ [root-of-the-server]__48b32c58._.js
   │  │  │  ├─ [root-of-the-server]__48b32c58._.js.map
   │  │  │  ├─ [turbopack]_runtime.js
   │  │  │  ├─ [turbopack]_runtime.js.map
   │  │  │  ├─ node_modules_next_229848ed._.js
   │  │  │  └─ node_modules_next_229848ed._.js.map
   │  │  ├─ pages/
   │  │  │  ├─ _app/
   │  │  │  │  ├─ build-manifest.json
   │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  ├─ _document/
   │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  ├─ _error/
   │  │  │  │  ├─ build-manifest.json
   │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  ├─ _app.js
   │  │  │  ├─ _app.js.map
   │  │  │  ├─ _document.js
   │  │  │  ├─ _document.js.map
   │  │  │  ├─ _error.js
   │  │  │  └─ _error.js.map
   │  │  ├─ app-paths-manifest.json
   │  │  ├─ interception-route-rewrite-manifest.js
   │  │  ├─ middleware-build-manifest.js
   │  │  ├─ middleware-manifest.json
   │  │  ├─ next-font-manifest.js
   │  │  ├─ next-font-manifest.json
   │  │  ├─ pages-manifest.json
   │  │  ├─ server-reference-manifest.js
   │  │  └─ server-reference-manifest.json
   │  ├─ static/
   │  │  ├─ chunks/
   │  │  │  ├─ pages/
   │  │  │  │  ├─ _app.js
   │  │  │  │  └─ _error.js
   │  │  │  ├─ _18571af0._.js
   │  │  │  ├─ _18571af0._.js.map
   │  │  │  ├─ _8af43eab._.js
   │  │  │  ├─ _8af43eab._.js.map
   │  │  │  ├─ _a894171a._.js
   │  │  │  ├─ _a894171a._.js.map
   │  │  │  ├─ _be8977ea._.js
   │  │  │  ├─ _be8977ea._.js.map
   │  │  │  ├─ _e69f0d32._.js
   │  │  │  ├─ _f809629c._.js
   │  │  │  ├─ _f809629c._.js.map
   │  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css
   │  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css.map
   │  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css
   │  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css.map
   │  │  │  ├─ [root-of-the-server]__49fd8634._.js
   │  │  │  ├─ [root-of-the-server]__49fd8634._.js.map
   │  │  │  ├─ [root-of-the-server]__8df7605f._.js
   │  │  │  ├─ [root-of-the-server]__8df7605f._.js.map
   │  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css
   │  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css.map
   │  │  │  ├─ [root-of-the-server]__923cb372._.js
   │  │  │  ├─ [root-of-the-server]__923cb372._.js.map
   │  │  │  ├─ [root-of-the-server]__e2c08166._.js
   │  │  │  ├─ [root-of-the-server]__e2c08166._.js.map
   │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_17e42fcf._.js
   │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_17e42fcf._.js.map
   │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js
   │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js.map
   │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_e80e495f._.js
   │  │  │  ├─ node_modules_@swc_helpers_cjs_00636ac3._.js
   │  │  │  ├─ node_modules_@swc_helpers_cjs_00636ac3._.js.map
   │  │  │  ├─ node_modules_191d724a._.js
   │  │  │  ├─ node_modules_191d724a._.js.map
   │  │  │  ├─ node_modules_a51498a5._.js
   │  │  │  ├─ node_modules_a51498a5._.js.map
   │  │  │  ├─ node_modules_b570cd49._.js
   │  │  │  ├─ node_modules_b570cd49._.js.map
   │  │  │  ├─ node_modules_next_066d1226._.js
   │  │  │  ├─ node_modules_next_066d1226._.js.map
   │  │  │  ├─ node_modules_next_dist_0eb1e458._.js
   │  │  │  ├─ node_modules_next_dist_0eb1e458._.js.map
   │  │  │  ├─ node_modules_next_dist_1a6ee436._.js
   │  │  │  ├─ node_modules_next_dist_1a6ee436._.js.map
   │  │  │  ├─ node_modules_next_dist_build_polyfills_polyfill-nomodule.js
   │  │  │  ├─ node_modules_next_dist_client_8f19e6fb._.js
   │  │  │  ├─ node_modules_next_dist_client_8f19e6fb._.js.map
   │  │  │  ├─ node_modules_next_dist_compiled_2ce9398a._.js
   │  │  │  ├─ node_modules_next_dist_compiled_2ce9398a._.js.map
   │  │  │  ├─ node_modules_react-dom_82bb97c6._.js
   │  │  │  ├─ node_modules_react-dom_82bb97c6._.js.map
   │  │  │  ├─ node_modules_react-icons_fa_index_mjs_d2e2d7f5._.js
   │  │  │  ├─ node_modules_react-icons_fa_index_mjs_d2e2d7f5._.js.map
   │  │  │  ├─ node_modules_react-icons_lib_74ccc930._.js
   │  │  │  ├─ node_modules_react-icons_lib_74ccc930._.js.map
   │  │  │  ├─ pages__app_5771e187._.js
   │  │  │  ├─ pages__app_9114105e._.js
   │  │  │  ├─ pages__app_9114105e._.js.map
   │  │  │  ├─ pages__error_5771e187._.js
   │  │  │  ├─ pages__error_ec6747c0._.js
   │  │  │  ├─ pages__error_ec6747c0._.js.map
   │  │  │  ├─ src_app_7c44d8f9._.js
   │  │  │  ├─ src_app_7c44d8f9._.js.map
   │  │  │  ├─ src_app_admin_365e78fc._.js
   │  │  │  ├─ src_app_admin_365e78fc._.js.map
   │  │  │  ├─ src_app_admin_4fef93d8._.js
   │  │  │  ├─ src_app_admin_4fef93d8._.js.map
   │  │  │  ├─ src_app_admin_addpackage_page_jsx_03f60be0._.js
   │  │  │  ├─ src_app_admin_cf4f932a._.js
   │  │  │  ├─ src_app_admin_cf4f932a._.js.map
   │  │  │  ├─ src_app_admin_layout_jsx_cf4a38cf._.js
   │  │  │  ├─ src_app_admin_package_page_jsx_03f60be0._.js
   │  │  │  ├─ src_app_admin_package_page_jsx_6547136d._.js
   │  │  │  ├─ src_app_admin_package_page_jsx_cf4a38cf._.js
   │  │  │  ├─ src_app_admin_users_page_jsx_03f60be0._.js
   │  │  │  ├─ src_app_favicon_ico_mjs_756fb309._.js
   │  │  │  ├─ src_app_globals_css_f9ee138c._.single.css
   │  │  │  ├─ src_app_globals_css_f9ee138c._.single.css.map
   │  │  │  ├─ src_app_layout_tsx_007ca514._.js
   │  │  │  └─ src_app_page_tsx_cf4a38cf._.js
   │  │  ├─ development/
   │  │  │  ├─ _buildManifest.js
   │  │  │  ├─ _clientMiddlewareManifest.json
   │  │  │  └─ _ssgManifest.js
   │  │  └─ media/
   │  │     ├─ favicon.45db1c09.ico
   │  │     ├─ gyByhwUxId8gMEwcGFWNOITd-s.p.da1ebef7.woff2
   │  │     ├─ gyByhwUxId8gMEwSGFWNOITddY4-s.81df3a5b.woff2
   │  │     ├─ gyByhwUxId8gMEwYGFWNOITddY4-s.b7d310ad.woff2
   │  │     ├─ or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2
   │  │     ├─ or3nQ6H_1_WfwkMZI_qYFrkdmhHkjkotbA-s.e32db976.woff2
   │  │     └─ or3nQ6H_1_WfwkMZI_qYFrMdmhHkjkotbA-s.cb6bbcb1.woff2
   │  ├─ types/
   │  ├─ app-build-manifest.json
   │  ├─ build-manifest.json
   │  ├─ fallback-build-manifest.json
   │  ├─ package.json
   │  ├─ trace
   │  ├─ transform.js
   │  └─ transform.js.map
   ├─ public/
   │  ├─ file.svg
   │  ├─ globe.svg
   │  ├─ next.svg
   │  ├─ vercel.svg
   │  └─ window.svg
   ├─ src/
   │  └─ app/
   │     ├─ admin/
   │     │  ├─ addpackage/
   │     │  │  └─ page.jsx
   │     │  ├─ components/
   │     │  │  ├─ sidebar/
   │     │  │  │  └─ Sidebarr.jsx
   │     │  │  └─ ProfileDropdown.jsx
   │     │  ├─ package/
   │     │  │  └─ page.jsx
   │     │  ├─ users/
   │     │  │  ├─ [id]/
   │     │  │  │  └─ edit/
   │     │  │  │     └─ page.jsx
   │     │  │  ├─ create/
   │     │  │  │  └─ page.jsx
   │     │  │  └─ page.jsx
   │     │  └─ layout.jsx
   │     ├─ context/
   │     │  └─ ProfileContext.jsx
   │     ├─ favicon.ico
   │     ├─ globals.css
   │     ├─ layout.tsx
   │     └─ page.tsx
   ├─ .gitignore
   ├─ next-env.d.ts
   ├─ next.config.ts
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ README.md
   └─ tsconfig.json

