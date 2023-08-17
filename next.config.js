const path = require("path");
const withPWAInit = require("next-pwa");

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
    sw: "/sw.js",
    scope: "/app",
    buildExcludes: ["app-build-manifest.json"],
});

const generateAppDirEntry = (entry) => {
    const packagePath = require.resolve("next-pwa");
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, "register.js");

    return entry().then((entries) => {
        if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
            if (Array.isArray(entries["main-app"])) {
                entries["main-app"].unshift(registerJs);
            } else if (typeof entries["main-app"] === "string") {
                entries["main-app"] = [registerJs, entries["main-app"]];
            }
        }
        return entries;
    });
};

const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["media.rawg.io"],
    },
    webpack: (config) => {
        const entry = generateAppDirEntry(config.entry);
        config.entry = () => entry;

        return config;
    },
};

module.exports = withPWA(nextConfig);
