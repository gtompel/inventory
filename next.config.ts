import type { NextConfig } from "next";

module.exports = {
  productionBrowserSourceMaps: true,
}

const nextConfig: NextConfig = {
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.devtool = 'source-map'

    }
  }




};

export default nextConfig;
