"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

// Define the ElastOS chain

const elastOSMainnet = defineChain({
  id: 20,
  name: "ElastOS",
  nativeCurrency: {
    decimals: 18,
    name: "ELA",
    symbol: "ELA",
  },
  rpcUrls: {
    default: {
      http: ["https://api.elastos.io/esc"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://esc.elastos.io/" },
  },
  testnet: false,
});

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  walletConnectors: [
    authWalletConnectors({
      authTypes: ["email", "google", "apple", "twitter", "github"], // Optional, restricts the types of social logins supported
    }),
  ],

  plugins: [
    wallet({
      // Optional configurations for the attached embedded wallet modal
      entryPosition: EntryPosition.BR, // Alters the position in which the modal button appears upon login
      visible: true, // Dictates whether or not the wallet modal is included/visible or not
    }),
  ],
  chains: [elastOSMainnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
