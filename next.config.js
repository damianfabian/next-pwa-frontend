const withPWA = require('next-pwa')
const generateSitemap = require('./scripts/sitemap'); //pending
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://flores4u.com'; // ??? not using

module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
        register: true,
    },
    pageExtensions: ['ts', 'tsx'],
    i18n: {
        locales: ['en', 'nl'],
        defaultLocale: 'en'
      },
})
